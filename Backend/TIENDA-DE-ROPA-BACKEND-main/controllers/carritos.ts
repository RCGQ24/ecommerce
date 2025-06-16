import { Request, Response } from 'express';
import Carrito from '../models/carrito';
import DetalleCarrito from '../models/detalle_carrito';
import Producto from '../models/producto';

class CarritosController {
  async getCarritos(req: Request, res: Response) {
    const carritos = await Carrito.findAll();
    if (carritos) {
      res.json(carritos);
    } else {
      res.status(404).json({ msg: 'Base de datos vacía' });
    }
  }

  async getCarrito(req: Request, res: Response) {
    const { id } = req.params;
    try {
      let carrito = await Carrito.findOne({ where: { id_usuario: id } });
      if (!carrito) {
        carrito = await Carrito.create({ id_usuario: id });
        return res.json({ id: carrito.id, id_usuario: id, items: [] });
      }
      // Buscar detalles del carrito
      const detalles = await DetalleCarrito.findAll({ where: { id_carrito: carrito.id } });
      // Obtener todos los productos relacionados
      const productosIds = detalles.map(det => det.id_producto);
      const productos = await Producto.findAll({ where: { id: productosIds } });
      // Combinar detalles con info de producto
      const items = detalles.map(det => {
        const prod = productos.find(p => String(p.id) === String(det.id_producto));
        return {
          id: det.id_producto,
          name: prod ? prod.nombre_producto : '',
          price: prod ? prod.precio : 0,
          image: prod ? prod.url_imagen : '',
          quantity: det.cantidad
        };
      });
      res.json({ id: carrito.id, id_usuario: id, items });
    } catch (error) {
      console.log('Error en getCarrito:', error);
      res.status(500).json({ msg: 'Error interno en getCarrito', error });
    }
  }

  async postCarrito(req: Request, res: Response) {
    const { body } = req;
    try {
      const carrito = await Carrito.create(body);
      res.json(carrito);
    } catch (error) {
      res.status(500).json({ msg: 'Hable con el administrador' });
    }
  }

  async putCarrito(req: Request, res: Response) {
    const { id } = req.params;
    const { items, ...carritoData } = req.body;
    try {
      console.log('Actualizando carrito para usuario:', id);
      console.log('Datos recibidos:', { items, carritoData });

      // Buscar el carrito por id_usuario
      let carrito = await Carrito.findOne({ where: { id_usuario: id } });
      if (!carrito) {
        console.log('Creando nuevo carrito para usuario:', id);
        carrito = await Carrito.create({ id_usuario: id });
      }
      
      await carrito.update(carritoData);
      const carritoId = carrito.id;
      console.log('ID del carrito:', carritoId);

      // Sincronizar detalles del carrito
      if (Array.isArray(items)) {
        console.log('Procesando items del carrito:', items);
        
        // Obtener detalles actuales
        const detallesActuales = await DetalleCarrito.findAll({ where: { id_carrito: carritoId } });
        console.log('Detalles actuales:', detallesActuales);
        
        const productosActuales = detallesActuales.map(d => d.id_producto);
        const productosNuevos = items.map(i => i.id);

        // Eliminar productos que ya no están
        for (const detalle of detallesActuales) {
          if (!productosNuevos.includes(detalle.id_producto)) {
            console.log('Eliminando detalle:', detalle.id);
            await detalle.destroy();
          }
        }

        // Agregar o actualizar productos
        for (const item of items) {
          console.log('Procesando item:', item);
          const detalleExistente = detallesActuales.find(d => d.id_producto === item.id);
          
          if (detalleExistente) {
            console.log('Actualizando cantidad para producto:', item.id);
            await detalleExistente.update({ cantidad: item.quantity });
          } else {
            console.log('Creando nuevo detalle para producto:', item.id);
            const producto = await Producto.findByPk(item.id);
            if (!producto) {
              console.error('Producto no encontrado:', item.id);
              continue;
            }
            await DetalleCarrito.create({
              id_carrito: carritoId,
              id_producto: item.id,
              cantidad: item.quantity,
              precio: producto.precio
            });
          }
        }
      }

      res.json({ msg: 'Carrito y detalles actualizados' });
    } catch (error) {
      console.error('Error en putCarrito:', error);
      res.status(500).json({ 
        msg: 'Error al actualizar el carrito',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }

  async deleteCarrito(req: Request, res: Response) {
    const { id } = req.params;
    const carrito = await Carrito.findByPk(id);
    if (!carrito) {
      return res.status(404).json({ msg: `No existe un carrito con el id ${id}` });
    }
    await carrito.destroy();
    res.json({ msg: 'Carrito eliminado' });
  }
}

export default new CarritosController();
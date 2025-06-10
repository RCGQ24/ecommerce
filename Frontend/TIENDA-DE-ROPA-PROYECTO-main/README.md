# Tienda de Ropa - E-commerce

## Estructura del Proyecto

### Características
1. Gestión de Productos
   - Agregar Producto
   - Consultar Producto

2. Gestión de Carrito
   - Agregar al Carrito
   - Consultar Carrito
   - Eliminar del Carrito

3. Gestión de Pago
   - Registrar Pago
   - Consultar Pago

4. Gestión de Orden
   - Generar Factura

### Estructura de Directorios
```
src/
├── app/
│   ├── features/
│   │   ├── gestion-productos/
│   │   │   ├── agregar-producto/
│   │   │   └── consultar-producto/
│   │   ├── gestion-carrito/
│   │   │   ├── agregar-al-carrito/
│   │   │   ├── consultar-carrito/
│   │   │   └── eliminar-del-carrito/
│   │   ├── gestion-pago/
│   │   │   ├── registrar-pago/
│   │   │   └── consultar-pago/
│   │   └── gestion-orden/
│   │       └── generar-factura/
│   └── shared/
│       ├── components/
│       ├── services/
│       ├── models/
│       └── interfaces/
```

### Ramas de Git
- main (producción)
- feature/gestion-productos
- feature/gestion-carrito
- feature/gestion-pago
- feature/gestion-orden

## Instrucciones de Configuración

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar servidor de desarrollo:
```bash
ng serve
```

3. Construir para producción:
```bash
ng build
```

## Flujo de Desarrollo

1. Crear una nueva rama de característica desde main:
```bash
git checkout -b feature/nombre-de-caracteristica
```

2. Realizar cambios y hacer commit:
```bash
git add .
git commit -m "Tu mensaje de commit"
```

3. Subir cambios:
```bash
git push origin feature/nombre-de-caracteristica
```

4. Crear un pull request para fusionar los cambios en main

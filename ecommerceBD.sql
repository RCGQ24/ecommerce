-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para ecommerce
CREATE DATABASE IF NOT EXISTS `ecommerce` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `ecommerce`;

-- Volcando estructura para tabla ecommerce.carritos
CREATE TABLE IF NOT EXISTS `carritos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` varchar(50) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_ultima_actualizacion` datetime DEFAULT NULL,
  UNIQUE KEY `Índice 1` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Datos de los carritos';

-- Volcando datos para la tabla ecommerce.carritos: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ecommerce.categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(50) DEFAULT NULL,
  UNIQUE KEY `Índice 1` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Datos de las categorias de los productos';

-- Volcando datos para la tabla ecommerce.categorias: ~4 rows (aproximadamente)
INSERT INTO `categorias` (`id`, `nombre_categoria`) VALUES
	(1, 'Deportivo'),
	(2, 'Casual'),
	(3, 'Formal'),
	(4, 'Uniforme');

-- Volcando estructura para tabla ecommerce.detalles de carritos
CREATE TABLE IF NOT EXISTS `detalles de carritos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_carrito` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio` decimal(5,2) DEFAULT NULL,
  UNIQUE KEY `Índice 1` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Datos de los detalles de los carritos';

-- Volcando datos para la tabla ecommerce.detalles de carritos: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ecommerce.facturas
CREATE TABLE IF NOT EXISTS `facturas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pago` int(11) DEFAULT NULL,
  `numero_factura` varchar(50) DEFAULT NULL,
  `fecha_factura` datetime DEFAULT NULL,
  `monto_total` decimal(7,2) DEFAULT NULL,
  UNIQUE KEY `Índice 1` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Datos de las facturas';

-- Volcando datos para la tabla ecommerce.facturas: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ecommerce.metodos de pago
CREATE TABLE IF NOT EXISTS `metodos de pago` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_metodo` varchar(50) DEFAULT NULL,
  UNIQUE KEY `Índice 1` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Datos de los metodos de pago';

-- Volcando datos para la tabla ecommerce.metodos de pago: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ecommerce.pagos
CREATE TABLE IF NOT EXISTS `pagos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_metodo_pago` int(11) DEFAULT NULL,
  `monto_pago` decimal(7,2) DEFAULT NULL,
  `fecha_pago` datetime DEFAULT NULL,
  `estado_pago` varchar(50) DEFAULT NULL,
  UNIQUE KEY `Índice 1` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Datos de los pagos';

-- Volcando datos para la tabla ecommerce.pagos: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ecommerce.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(20) DEFAULT NULL,
  `id_categoria` varchar(50) NOT NULL DEFAULT '',
  `precio` decimal(5,2) DEFAULT NULL,
  `url_imagen` varchar(1000) DEFAULT NULL,
  `talla` char(2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `fecha_registro` datetime NOT NULL,
  UNIQUE KEY `Producto` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Datos de los productos en venta en Ecommerce';

-- Volcando datos para la tabla ecommerce.productos: ~10 rows (aproximadamente)
INSERT INTO `productos` (`id`, `nombre_producto`, `id_categoria`, `precio`, `url_imagen`, `talla`, `stock`, `fecha_registro`) VALUES
	(1, 'camisa de mario', 'casual', 20.00, 'https://m.media-amazon.com/images/I/7173IO6yZFL._AC_UY1000_.jpg', '10', 30, '0000-00-00 00:00:00'),
	(2, 'sueter de Zelda', 'casual', 20.00, 'https://www.veinerd.com/uploads/products/large/zelda-1-mangalonga.jpg', '8', 20, '0000-00-00 00:00:00'),
	(3, 'Camisa de Metroid', 'casual', 40.00, 'https://m.media-amazon.com/images/I/914PnU42B+L._AC_UY1000_.jpg', '30', 24, '0000-00-00 00:00:00'),
	(4, 'Pantalón formal', 'formal', 20.00, 'https://vittorioforti.com.mx/cdn/shop/products/VPN03078NE_1_310aacf1-8ef2-4ec9-8bcc-c12658630831.jpg?v=1744070921', '30', 15, '0000-00-00 00:00:00'),
	(5, 'Camisa Beige', 'casual', 55.00, 'https://http2.mlstatic.com/D_NQ_NP_790402-MLV51582198703_092022-O.webp', '15', 10, '0000-00-00 00:00:00'),
	(6, 'Zapato nike', 'deportivo', 120.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd2Kt-jN-YG4p2R1D-Wj4fCGqnvJqei-FZGw&s', '40', 10, '0000-00-00 00:00:00'),
	(7, 'Camisa Nike roja', 'casual', 30.00, 'https://i.ebayimg.com/thumbs/images/g/CfUAAOSwvS5k3ld3/s-l1200.jpg', '30', 5, '0000-00-00 00:00:00'),
	(8, 'Lentes de sol', 'casual', 35.00, 'https://m.media-amazon.com/images/I/71JWaxI-XvL.jpg', '10', 20, '0000-00-00 00:00:00'),
	(9, 'Camisa negra adidas', 'deportivo', 50.00, 'https://i.ebayimg.com/images/g/g4AAAOSw~jZcriiC/s-l640.jpg', '18', 10, '0000-00-00 00:00:00'),
	(10, 'Camisa negra adidas', 'deportivo', 50.00, 'https://i.ebayimg.com/images/g/g4AAAOSw~jZcriiC/s-l640.jpg', '18', 20, '0000-00-00 00:00:00');

-- Volcando estructura para tabla ecommerce.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(50) DEFAULT NULL,
  UNIQUE KEY `Índice 1` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Datos de los roles';

-- Volcando datos para la tabla ecommerce.roles: ~1 rows (aproximadamente)
INSERT INTO `roles` (`id`, `nombre_rol`) VALUES
	(1, 'Administrador');

-- Volcando estructura para tabla ecommerce.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `contrasena` varchar(50) DEFAULT NULL,
  `id_rol` varchar(50) DEFAULT NULL,
  `fecha_registro` datetime DEFAULT NULL,
  UNIQUE KEY `Índice 1` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Datos de los usuarios';

-- Volcando datos para la tabla ecommerce.usuarios: ~7 rows (aproximadamente)
INSERT INTO `usuarios` (`id`, `nombre_usuario`, `email`, `contrasena`, `id_rol`, `fecha_registro`) VALUES
	(1, 'Administrador', 'admin@correo.com', 'admin123', 'Administrador', NULL),
	(2, 'Usuario', 'usuario@correo.com', 'usuario123', 'Usuario', NULL),
	(3, 'Usuario2', 'usuario2@correo.com', 'usuario456', 'Usuarios', NULL),
	(5, 'Usuario3', 'andres@gmail.com', 'andresito', 'Usuarios', NULL),
	(6, 'Usuario4', 'valeria2105@gmail.com', 'V21a10v05c', 'Usuarios', NULL),
	(7, 'Usuario5', 'gilbertogmoncadad@gmail.com', '12345', 'Usuarios', NULL),
	(8, 'Usuario6', 'movalles@usb.ve', '222', 'Usuarios', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

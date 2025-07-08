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
  `id_usuario` varchar(255) DEFAULT NULL,
  UNIQUE KEY `Índice 1` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Datos de los carritos';

-- Volcando datos para la tabla ecommerce.carritos: ~6 rows (aproximadamente)
INSERT INTO `carritos` (`id`, `id_usuario`) VALUES
	(4, '6'),
	(5, '11'),
	(6, '9'),
	(7, '5'),
	(8, '8'),
	(9, '7');

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

-- Volcando estructura para tabla ecommerce.detalle_carritos
CREATE TABLE IF NOT EXISTS `detalle_carritos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_carrito` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_carrito` (`id_carrito`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `detalle_carritos_ibfk_1` FOREIGN KEY (`id_carrito`) REFERENCES `carritos` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `detalle_carritos_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `detalle_carritos_ibfk_3` FOREIGN KEY (`id_carrito`) REFERENCES `carritos` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `detalle_carritos_ibfk_4` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla ecommerce.detalle_carritos: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ecommerce.facturas
CREATE TABLE IF NOT EXISTS `facturas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pago` int(11) NOT NULL,
  `numero_factura` varchar(50) NOT NULL,
  `fecha_factura` datetime NOT NULL,
  `monto_total` decimal(10,2) NOT NULL,
  `email` varchar(100) NOT NULL,
  `items_detalle` text DEFAULT NULL,
  UNIQUE KEY `Índice 1` (`id`) USING BTREE,
  UNIQUE KEY `numero_factura` (`numero_factura`),
  UNIQUE KEY `numero_factura_2` (`numero_factura`),
  UNIQUE KEY `numero_factura_3` (`numero_factura`),
  UNIQUE KEY `numero_factura_4` (`numero_factura`),
  UNIQUE KEY `numero_factura_5` (`numero_factura`),
  UNIQUE KEY `numero_factura_6` (`numero_factura`),
  UNIQUE KEY `numero_factura_7` (`numero_factura`),
  UNIQUE KEY `numero_factura_8` (`numero_factura`),
  UNIQUE KEY `numero_factura_9` (`numero_factura`),
  UNIQUE KEY `numero_factura_10` (`numero_factura`),
  UNIQUE KEY `numero_factura_11` (`numero_factura`),
  UNIQUE KEY `numero_factura_12` (`numero_factura`),
  UNIQUE KEY `numero_factura_13` (`numero_factura`),
  UNIQUE KEY `numero_factura_14` (`numero_factura`),
  UNIQUE KEY `numero_factura_15` (`numero_factura`),
  UNIQUE KEY `numero_factura_16` (`numero_factura`),
  UNIQUE KEY `numero_factura_17` (`numero_factura`),
  UNIQUE KEY `numero_factura_18` (`numero_factura`),
  UNIQUE KEY `numero_factura_19` (`numero_factura`),
  UNIQUE KEY `numero_factura_20` (`numero_factura`),
  UNIQUE KEY `numero_factura_21` (`numero_factura`),
  UNIQUE KEY `numero_factura_22` (`numero_factura`),
  UNIQUE KEY `numero_factura_23` (`numero_factura`),
  UNIQUE KEY `numero_factura_24` (`numero_factura`),
  UNIQUE KEY `numero_factura_25` (`numero_factura`),
  UNIQUE KEY `numero_factura_26` (`numero_factura`),
  UNIQUE KEY `numero_factura_27` (`numero_factura`),
  UNIQUE KEY `numero_factura_28` (`numero_factura`),
  UNIQUE KEY `numero_factura_29` (`numero_factura`),
  UNIQUE KEY `numero_factura_30` (`numero_factura`),
  UNIQUE KEY `numero_factura_31` (`numero_factura`),
  UNIQUE KEY `numero_factura_32` (`numero_factura`),
  UNIQUE KEY `numero_factura_33` (`numero_factura`),
  UNIQUE KEY `numero_factura_34` (`numero_factura`),
  UNIQUE KEY `numero_factura_35` (`numero_factura`),
  UNIQUE KEY `numero_factura_36` (`numero_factura`),
  UNIQUE KEY `numero_factura_37` (`numero_factura`),
  UNIQUE KEY `numero_factura_38` (`numero_factura`),
  UNIQUE KEY `numero_factura_39` (`numero_factura`),
  UNIQUE KEY `numero_factura_40` (`numero_factura`),
  UNIQUE KEY `numero_factura_41` (`numero_factura`),
  UNIQUE KEY `numero_factura_42` (`numero_factura`),
  UNIQUE KEY `numero_factura_43` (`numero_factura`),
  UNIQUE KEY `numero_factura_44` (`numero_factura`),
  UNIQUE KEY `numero_factura_45` (`numero_factura`),
  UNIQUE KEY `numero_factura_46` (`numero_factura`),
  UNIQUE KEY `numero_factura_47` (`numero_factura`),
  UNIQUE KEY `numero_factura_48` (`numero_factura`),
  UNIQUE KEY `numero_factura_49` (`numero_factura`),
  UNIQUE KEY `numero_factura_50` (`numero_factura`),
  UNIQUE KEY `numero_factura_51` (`numero_factura`),
  UNIQUE KEY `numero_factura_52` (`numero_factura`),
  UNIQUE KEY `numero_factura_53` (`numero_factura`),
  UNIQUE KEY `numero_factura_54` (`numero_factura`),
  UNIQUE KEY `numero_factura_55` (`numero_factura`),
  UNIQUE KEY `numero_factura_56` (`numero_factura`),
  UNIQUE KEY `numero_factura_57` (`numero_factura`),
  UNIQUE KEY `numero_factura_58` (`numero_factura`),
  UNIQUE KEY `numero_factura_59` (`numero_factura`),
  UNIQUE KEY `numero_factura_60` (`numero_factura`),
  UNIQUE KEY `numero_factura_61` (`numero_factura`),
  UNIQUE KEY `numero_factura_62` (`numero_factura`),
  UNIQUE KEY `numero_factura_63` (`numero_factura`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Datos de las facturas';

-- Volcando datos para la tabla ecommerce.facturas: ~4 rows (aproximadamente)
INSERT INTO `facturas` (`id`, `id_pago`, `numero_factura`, `fecha_factura`, `monto_total`, `email`, `items_detalle`) VALUES
	(1, 1, 'FAC-1751941297340', '2025-07-08 02:21:37', 20.00, 'vavelasco.24@est.ucab.edu.ve', '[{"id":2,"nombre":"sueter de Zelda","descripcion":"sueter de Zelda","talla":"8","precio":"20.00","cantidad":1,"url_imagen":"https://www.veinerd.com/uploads/products/large/zelda-1-mangalonga.jpg"}]'),
	(2, 2, 'FAC-1751942436546', '2025-07-08 02:40:36', 160.00, 'andres@gmail.com', '[{"id":3,"nombre":"Camisa de Metroid","descripcion":"Camisa de Metroid","talla":"30","precio":"40.00","cantidad":1,"url_imagen":"https://m.media-amazon.com/images/I/914PnU42B+L._AC_UY1000_.jpg"},{"id":6,"nombre":"Zapato nike","descripcion":"Zapato nike","talla":"40","precio":"120.00","cantidad":1,"url_imagen":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd2Kt-jN-YG4p2R1D-Wj4fCGqnvJqei-FZGw&s"}]'),
	(3, 3, 'FAC-1751942484753', '2025-07-08 02:41:24', 185.00, 'valeria2105@gmail.com', '[{"id":5,"nombre":"Camisa Beige","descripcion":"Camisa Beige","talla":"Única","precio":"55.00","cantidad":2,"url_imagen":"https://http2.mlstatic.com/D_NQ_NP_790402-MLV51582198703_092022-O.webp"},{"id":3,"nombre":"Camisa de Metroid","descripcion":"Camisa de Metroid","talla":"30","precio":"40.00","cantidad":1,"url_imagen":"https://m.media-amazon.com/images/I/914PnU42B+L._AC_UY1000_.jpg"},{"id":8,"nombre":"Lentes de sol","descripcion":"Lentes de sol","talla":"10","precio":"35.00","cantidad":1,"url_imagen":"https://m.media-amazon.com/images/I/71JWaxI-XvL.jpg"}]'),
	(4, 4, 'FAC-1751942532228', '2025-07-08 02:42:12', 85.00, 'movalles@usb.ve', '[{"id":8,"nombre":"Lentes de sol","descripcion":"Lentes de sol","talla":"10","precio":"35.00","cantidad":1,"url_imagen":"https://m.media-amazon.com/images/I/71JWaxI-XvL.jpg"},{"id":11,"nombre":"zapatos formales","descripcion":"zapatos formales","talla":"40","precio":"50.00","cantidad":1,"url_imagen":"https://www.venus.com.ec/media/catalog/product/m/a/maurizio1_1_.jpg?width=650&height=650&store=ec&image-type=image"}]'),
	(5, 5, 'FAC-1751942958215', '2025-07-08 02:49:18', 145.00, 'gilbertogmoncadad@gmail.com', '[{"id":8,"nombre":"Lentes de sol","descripcion":"Lentes de sol","talla":"10","precio":"35.00","cantidad":1,"url_imagen":"https://m.media-amazon.com/images/I/71JWaxI-XvL.jpg"},{"id":11,"nombre":"zapatos formales","descripcion":"zapatos formales","talla":"40","precio":"50.00","cantidad":1,"url_imagen":"https://www.venus.com.ec/media/catalog/product/m/a/maurizio1_1_.jpg?width=650&height=650&store=ec&image-type=image"},{"id":14,"nombre":"Saco formal ","descripcion":"Saco formal ","talla":"30","precio":"60.00","cantidad":1,"url_imagen":"https://ss261.liverpool.com.mx/xl/1064456084.jpg"}]');

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
  `monto_pago` decimal(10,2) DEFAULT NULL,
  `email_usuario` varchar(255) DEFAULT NULL,
  `estado_pago` varchar(255) DEFAULT NULL,
  `fecha_pago` datetime DEFAULT current_timestamp(),
  `productos` text DEFAULT NULL,
  `numero_factura` varchar(50) DEFAULT NULL,
  UNIQUE KEY `Índice 1` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Datos de los pagos';

-- Volcando datos para la tabla ecommerce.pagos: ~5 rows (aproximadamente)
INSERT INTO `pagos` (`id`, `id_metodo_pago`, `monto_pago`, `email_usuario`, `estado_pago`, `fecha_pago`, `productos`, `numero_factura`) VALUES
	(1, 3, 20.00, 'vavelasco.24@est.ucab.edu.ve', 'completado', '2025-07-08 02:21:37', '[{"id":2,"nombre":"sueter de Zelda","descripcion":"sueter de Zelda","talla":"8","precio":"20.00","cantidad":1,"url_imagen":"https://www.veinerd.com/uploads/products/large/zelda-1-mangalonga.jpg"}]', 'FAC-1751941297340'),
	(2, 3, 160.00, 'andres@gmail.com', 'completado', '2025-07-08 02:40:36', '[{"id":3,"nombre":"Camisa de Metroid","descripcion":"Camisa de Metroid","talla":"30","precio":"40.00","cantidad":1,"url_imagen":"https://m.media-amazon.com/images/I/914PnU42B+L._AC_UY1000_.jpg"},{"id":6,"nombre":"Zapato nike","descripcion":"Zapato nike","talla":"40","precio":"120.00","cantidad":1,"url_imagen":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd2Kt-jN-YG4p2R1D-Wj4fCGqnvJqei-FZGw&s"}]', 'FAC-1751942436546'),
	(3, 3, 185.00, 'valeria2105@gmail.com', 'completado', '2025-07-08 02:41:24', '[{"id":5,"nombre":"Camisa Beige","descripcion":"Camisa Beige","talla":"Única","precio":"55.00","cantidad":2,"url_imagen":"https://http2.mlstatic.com/D_NQ_NP_790402-MLV51582198703_092022-O.webp"},{"id":3,"nombre":"Camisa de Metroid","descripcion":"Camisa de Metroid","talla":"30","precio":"40.00","cantidad":1,"url_imagen":"https://m.media-amazon.com/images/I/914PnU42B+L._AC_UY1000_.jpg"},{"id":8,"nombre":"Lentes de sol","descripcion":"Lentes de sol","talla":"10","precio":"35.00","cantidad":1,"url_imagen":"https://m.media-amazon.com/images/I/71JWaxI-XvL.jpg"}]', 'FAC-1751942484753'),
	(4, 3, 85.00, 'movalles@usb.ve', 'completado', '2025-07-08 02:42:12', '[{"id":8,"nombre":"Lentes de sol","descripcion":"Lentes de sol","talla":"10","precio":"35.00","cantidad":1,"url_imagen":"https://m.media-amazon.com/images/I/71JWaxI-XvL.jpg"},{"id":11,"nombre":"zapatos formales","descripcion":"zapatos formales","talla":"40","precio":"50.00","cantidad":1,"url_imagen":"https://www.venus.com.ec/media/catalog/product/m/a/maurizio1_1_.jpg?width=650&height=650&store=ec&image-type=image"}]', 'FAC-1751942532228'),
	(5, 3, 145.00, 'gilbertogmoncadad@gmail.com', 'completado', '2025-07-08 02:49:18', '[{"id":8,"nombre":"Lentes de sol","descripcion":"Lentes de sol","talla":"10","precio":"35.00","cantidad":1,"url_imagen":"https://m.media-amazon.com/images/I/71JWaxI-XvL.jpg"},{"id":11,"nombre":"zapatos formales","descripcion":"zapatos formales","talla":"40","precio":"50.00","cantidad":1,"url_imagen":"https://www.venus.com.ec/media/catalog/product/m/a/maurizio1_1_.jpg?width=650&height=650&store=ec&image-type=image"},{"id":14,"nombre":"Saco formal ","descripcion":"Saco formal ","talla":"30","precio":"60.00","cantidad":1,"url_imagen":"https://ss261.liverpool.com.mx/xl/1064456084.jpg"}]', 'FAC-1751942958215');

-- Volcando estructura para tabla ecommerce.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(255) DEFAULT NULL,
  `id_categoria` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `url_imagen` varchar(255) DEFAULT NULL,
  `talla` char(255) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  UNIQUE KEY `Producto` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Datos de los productos en venta en Ecommerce';

-- Volcando datos para la tabla ecommerce.productos: ~9 rows (aproximadamente)
INSERT INTO `productos` (`id`, `nombre_producto`, `id_categoria`, `precio`, `url_imagen`, `talla`, `stock`) VALUES
	(1, 'camisa de mario', 'casual', 30.00, 'https://m.media-amazon.com/images/I/7173IO6yZFL._AC_UY1000_.jpg', '10', 30),
	(2, 'sueter de Zelda', '2', 20.00, 'https://www.veinerd.com/uploads/products/large/zelda-1-mangalonga.jpg', '8', 20),
	(3, 'Camisa de Metroid', 'casual', 40.00, 'https://m.media-amazon.com/images/I/914PnU42B+L._AC_UY1000_.jpg', '30', 24),
	(4, 'Pantalón formal', 'formal', 20.00, 'https://vittorioforti.com.mx/cdn/shop/products/VPN03078NE_1_310aacf1-8ef2-4ec9-8bcc-c12658630831.jpg?v=1744070921', '30', 15),
	(5, 'Camisa Beige', 'casual', 55.00, 'https://http2.mlstatic.com/D_NQ_NP_790402-MLV51582198703_092022-O.webp', '15', 10),
	(6, 'Zapato nike', 'deportivo', 120.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd2Kt-jN-YG4p2R1D-Wj4fCGqnvJqei-FZGw&s', '40', 10),
	(8, 'Lentes de sol', 'casual', 35.00, 'https://m.media-amazon.com/images/I/71JWaxI-XvL.jpg', '10', 19),
	(11, 'zapatos formales', 'formal', 50.00, 'https://www.venus.com.ec/media/catalog/product/m/a/maurizio1_1_.jpg?width=650&height=650&store=ec&image-type=image', '40', 19),
	(14, 'Saco formal ', 'formal', 60.00, 'https://ss261.liverpool.com.mx/xl/1064456084.jpg', '30', 24);

-- Volcando estructura para tabla ecommerce.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(50) DEFAULT NULL,
  UNIQUE KEY `Índice 1` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Datos de los roles';

-- Volcando datos para la tabla ecommerce.roles: ~3 rows (aproximadamente)
INSERT INTO `roles` (`id`, `nombre_rol`) VALUES
	(1, 'Administrador'),
	(2, 'Usuario'),
	(3, 'Supervisor'),
	(4, 'Empleado');

-- Volcando estructura para tabla ecommerce.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `id_rol` varchar(255) DEFAULT NULL,
  UNIQUE KEY `Índice 1` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Datos de los usuarios';

-- Volcando datos para la tabla ecommerce.usuarios: ~10 rows (aproximadamente)
INSERT INTO `usuarios` (`id`, `nombre_usuario`, `email`, `contrasena`, `id_rol`) VALUES
	(1, 'Administrador', 'admin@correo.com', 'admin123', 'Administrador'),
	(2, 'Usuario', 'usuario@correo.com', 'usuario123', 'Usuario'),
	(3, 'Usuario2', 'usuario2@correo.com', 'usuario456', 'Usuarios'),
	(5, 'Usuario3', 'andres@gmail.com', 'andresito', 'Usuarios'),
	(6, 'Usuario4', 'valeria2105@gmail.com', 'V21a10v05c', 'Usuarios'),
	(7, 'Usuario5', 'gilbertogmoncadad@gmail.com', '12345', 'Usuarios'),
	(8, 'Usuario6', 'movalles@usb.ve', '222', 'Usuarios'),
	(9, 'Usuario7', 'vavelasco.24@est.ucab.edu.ve', '1234', 'Usuarios'),
	(10, 'Empleado', 'empleado@correo.com', 'emple123', 'Empleado'),
	(11, 'Supervisor', 'supervisor@correo.com', 'superv1234', 'Supervisor');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

package com.utp.tridentist.controller;

import com.utp.tridentist.model.MovimientoInventario;
import com.utp.tridentist.model.Producto;
import com.utp.tridentist.repository.MovimientoInventarioRepository;
import com.utp.tridentist.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inventario")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private MovimientoInventarioRepository movimientoInventarioRepository;

    @GetMapping
    public ResponseEntity<List<Producto>> getAll() {
        return ResponseEntity.ok(productoRepository.findAll());
    }

    @GetMapping("/productos")
    public ResponseEntity<List<Producto>> getProductos() {
        return ResponseEntity.ok(productoRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Producto> crearProductoRoot(@RequestBody Producto producto) {
        Producto nuevo = productoRepository.save(producto);
        return ResponseEntity.ok(nuevo);
    }

    @PostMapping("/productos")
    public ResponseEntity<Producto> crearProducto(@RequestBody Producto producto) {
        Producto nuevo = productoRepository.save(producto);
        return ResponseEntity.ok(nuevo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Long id, @RequestBody Producto details) {
        Optional<Producto> pOpt = productoRepository.findById(id);
        if (pOpt.isPresent()) {
            details.setId(id);
            return ResponseEntity.ok(productoRepository.save(details));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/movimientos")
    @Transactional
    public ResponseEntity<MovimientoInventario> registrarMovimiento(@RequestBody MovimientoInventario movimiento) {
        if (movimiento.getProducto() == null || movimiento.getProducto().getId() == null) {
            return ResponseEntity.badRequest().build();
        }

        Optional<Producto> productoOpt = productoRepository.findById(movimiento.getProducto().getId());
        if (productoOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Producto producto = productoOpt.get();
        int cantidad = movimiento.getCantidad() != null ? movimiento.getCantidad() : 0;
        int stockActual = producto.getStockActual() != null ? producto.getStockActual() : 0;

        if ("ENTRADA".equalsIgnoreCase(movimiento.getTipo())) {
            producto.setStockActual(stockActual + cantidad);
        } else if ("SALIDA".equalsIgnoreCase(movimiento.getTipo())) {
            producto.setStockActual(stockActual - cantidad);
        }

        productoRepository.save(producto);
        movimiento.setProducto(producto);
        MovimientoInventario guardado = movimientoInventarioRepository.save(movimiento);

        return ResponseEntity.ok(guardado);
    }
}

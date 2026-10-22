import {
  Component,
  OnInit,
  ViewChild,
  inject,
  signal
} from '@angular/core';

import { DecimalPipe } from '@angular/common';

import { ProductoService } from '../../core/services/producto.service';
import { Producto } from '../../models/producto.model';

import { ProductoFormComponent } from '../product-form/product-form';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [ProductoFormComponent, DecimalPipe],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class ProductosComponent implements OnInit {

  private productoService = inject(ProductoService);

  productos = signal<Producto[]>([]);

  @ViewChild(ProductoFormComponent)
  formularioProducto!: ProductoFormComponent;

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {

    this.productoService
      .obtenerProductos()
      .subscribe({

        next: productos => {
          console.log(
            'Productos recibidos:',
            productos
          );

          this.productos.set(productos);
        },

        error: error => {
          console.error(
            'Error obteniendo productos:',
            error
          );
        }
      });
  }

  seleccionarParaEditar(producto: Producto): void {

    if (this.formularioProducto) {
      this.formularioProducto.editarProducto(producto);
    }
  }

  eliminar(id: number): void {

    if (!confirm('¿Eliminar producto?')) {
      return;
    }

    this.productoService
      .eliminarProducto(id)
      .subscribe({

        next: () => {
          this.cargarProductos();
        },

        error: error => {
          console.error(
            'Error eliminando producto:',
            error
          );
        }
      });
  }
}

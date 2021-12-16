import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Productos } from '../../model/producto';
import { Route, Router } from '@angular/router';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
//variables
  public ListaProductos: Productos[];
  constructor(
    public productosServices: ProductoService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos(){
    this.productosServices.getProductos().subscribe(
      res =>{
        console.log(res);
        this.ListaProductos= <any>res;
      },
      err => console.log(err)
      
    )
  }
  eliminarProducto(id:string){
    this.productosServices.eliminarProducto(id).subscribe(res=>{
      this.messageService.openSnackBar('Producto eliminado', 'Aceptar');
      this.listarProductos();
    },error=>{
      this.messageService.openSnackBar(error, 'Aceptar');
    });
  }

  RedirigirModificar(id:string){
    this.router.navigate(['/editar/'+id])
  }

}

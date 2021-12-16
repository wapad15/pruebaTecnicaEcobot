import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/message.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Productos } from '../../model/producto';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  public producto: Productos;
  public productoForm: FormGroup;
  constructor(
    public productosServices: ProductoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.armarForm();
  }

  agregarProducto(){
    let estado = this.productoForm.get('estado').value;
    if(estado>1 ||estado<0 ){
      this.messageService.openSnackBar('El estado solo puede ser [1] ó [0]', 'Aceptar');
      return
    }
   
    if(this.productoForm.invalid){
      this.messageService.openSnackBar('formulario invalido', 'Aceptar');
      return
    }
    
    this.producto ={
      nombre: this.productoForm.get('nombre').value,
      categoria: this.productoForm.get('categoria').value,
      sabor: this.productoForm.get('sabor').value,
      precio: this.productoForm.get('precio').value,
      estado: this.productoForm.get('estado').value,
          }
    this.productosServices.agregarProducto(this.producto).subscribe(
      res=>{
        this.messageService.openSnackBar('producto agregado', 'Aceptar');
      }, error =>{
        this.messageService.openSnackBar('error al agregar', 'Aceptar');
      }
    );
    this.router.navigate(['/inicio'])
  }
  armarForm(){
    this.productoForm = this.formBuilder.group({
      nombre: new FormControl(null,[Validators.required]),
      categoria: new FormControl(null,[Validators.required]),
      sabor: new FormControl(null,[Validators.required]),
      precio: new FormControl(null,[Validators.required]),
      estado: new FormControl(null,[Validators.required]),
    })
  }
}

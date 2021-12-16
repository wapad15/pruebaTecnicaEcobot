import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/message.service';
import { Productos } from 'src/app/model/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  public producto: Productos;
  public productoForm: FormGroup;
  constructor(
    public productosServices: ProductoService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.armarForm();
    let id = this.activateRoute.snapshot.params["id"]
    this.getInitProduc(id)

  }

  getInitProduc(id: string){
      this.productosServices.getProductoId(id).subscribe(
        res=>{
          let produc = res[0];
          this.productoForm.get('nombre').setValue(produc.nombre);
          this.productoForm.get('categoria').setValue(produc.categoria);
          this.productoForm.get('sabor').setValue(produc.sabor);
          this.productoForm.get('precio').setValue(produc.precio);
          this.productoForm.get('estado').setValue(produc.estado);
            
        }
      )
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
  

  editarProducto(){
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
        this.messageService.openSnackBar('producto editado', 'Aceptar');
      }, error =>{
        this.messageService.openSnackBar('error al editar', 'Aceptar');
      }
    );
    this.router.navigate(['/inicio'])
  }
}

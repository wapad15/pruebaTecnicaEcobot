import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { Productos } from '../model/producto';
 
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = '/api';
 
  constructor(
    private http: HttpClient,
  ) 
  { }


  //obtener lista de productos
  getProductos(){
    return this.http.get(this.url);
  }

  //obtener un producto por id
  getProductoId(id : string){
    const url = `${this.url}/${id}`
    return this.http.get(url);
  }

  //agregar producto
  agregarProducto(producto: Productos){

    return this.http.post(this.url, producto);
  }
  
  //eliminar producto
  eliminarProducto(id: string){
    const url = `${this.url}/${id}`
    return this.http.delete(url)
  }

  //modificar producto
  editarProducto(id: string, producto: Productos){
    const url = `${this.url}/${id}`
    return this.http.put(url, producto);
  }
}

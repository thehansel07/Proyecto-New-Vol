import { Injectable } from '@angular/core';
import {HttpClient,HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import{Producto} from '../Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
URL='https://tiendadeproducto.azurewebsites.net/producto';

  constructor(private http:HttpClient) {  }


getTodoProducto():Observable<HttpResponse<Producto[]>>{

  return this.http.get<Producto[]>(this.URL,{observe:'response'});

}


addProducto(prod:Producto):Observable<HttpResponse<Producto>>{


  return this.http.post<Producto>(this.URL, prod, {observe: 'response'});




}

getProductoById(codigo:string):Observable<HttpResponse<Producto>>{
  return this.http.get<Producto>(this.URL+'/'+codigo,{observe:'response'});
}


updateProducto(prod:Producto):Observable<HttpResponse<Producto>>{
  console.log('Vamos a editar estudiante...');
  return this.http.put<Producto>(this.URL + '/' + prod.codigo, prod, {observe: 'response'});




}

DeleteProducto(codigo:string):Observable<HttpResponse<void>>{
  return this.http.delete<void>(this.URL + '/' + codigo, {observe:'response'});





}











}
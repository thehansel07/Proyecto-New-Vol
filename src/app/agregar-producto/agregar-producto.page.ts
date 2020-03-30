import { Component, OnInit } from '@angular/core';
import { Producto } from '../Producto';
import { ProductoService } from '../services/producto.service';
import { ToastController, AlertController, NavController } from '@ionic/angular';
import { HttpResponse } from '@angular/common/http';
import { async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
 export class AgregarProductoPage implements OnInit {
    prod:Producto;
    constructor(
      private prodService:ProductoService,
      private toasController:ToastController,
      private alertControl:AlertController,
      private navctrl:NavController,
      private activaRoute:ActivatedRoute
      ) { }
  
    ngOnInit() {
      this.prod = new Producto();
      const codigo=this.activaRoute.snapshot.paramMap.get('codigo');
      console.log('Producto codigo'+ codigo);
      if(codigo!==codigo){
        console.log('El codigo  de la lista de los producto se ha configurado');
        this.prodService.getProductoById(codigo).subscribe((prod:HttpResponse<Producto>)=>{
          this.prod=prod.body;
          console.log(this.prod);
        });
      }
      
    }

    Guardar(){
      console.log('Guardando Datos ingregasdos...',this.prod.codigo);
      if(this.prod.codigo == this.prod.codigo){
      this.prodService.addProducto(this.prod).subscribe(async(prod:HttpResponse<Producto>)=>{
      let toast = await this.toasController.create({
        message:'Datos Guardados correctamente...' + this.prod.nombre,
        duration:1000
      });
      return await toast.present().then(()=>{
        this.navctrl.navigateRoot('home');
  
  
  
      })
  
      });
  
    }else{
      console.log('Actualizando lista producto....');
      this.prodService.updateProducto(this.prod).subscribe(async(prod:HttpResponse<Producto>)=>{
       let toast = await this.toasController.create({
         message:'El producto' + this.prod.nombre + 'fue actualizado...',
         duration:1000
  
  
  
       });
       return await toast.present().then(()=>{
         this.navctrl.navigateRoot('home');
  
  
       });
  
  
      });
  
  
    }
  
  
  
    }




    

  
  }
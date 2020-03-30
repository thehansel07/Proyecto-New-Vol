import { Component, OnInit } from '@angular/core';
import { Producto } from '../Producto';
import { ProductoService } from '../services/producto.service';
import { ToastController, AlertController, NavController } from '@ionic/angular';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  proList:Producto[];
  constructor(
    private prodService:ProductoService,
    private toasController:ToastController,
    private alertControl:AlertController,
    private navctrl:NavController
    ) { }

  ngOnInit():void {
    this.loadAll();
  }
  loadAll(){
    this.prodService.getTodoProducto().subscribe(async (proList:HttpResponse<Producto[]>)=>{
      this.proList=proList.body;
      let toast=await this.toasController.create({
        message:"Producto Mostrado Correctamente...",
        duration:3000
      });
      return await toast.present();
    })
  }


  doRefresh(event){
    console.log("Se han Actualizado");
    this.loadAll();
    setTimeout(()=>{
      console.log('La operacion ha sido Actualizada');
      event.target.complete();
    },2000);
  }




  async EliminarProducto(codigo:string){
    console.log('Producto eliminado' + codigo);
    const confirm = this.alertControl.create({
      message:'Quieres eliminar este producto??',
      buttons:[


        {
          text:'No',
          handler:() =>{
            console.log('En proceso...');



          }
        },
          {
            text:'Si',
          handler:() =>{
          this.prodService.DeleteProducto(codigo).subscribe(async()=>{
          let toast = await this.toasController.create({
            message:'El ID '  + codigo + " " + 'fue eliminado correctamente...',
            duration:1000



          });
          toast.present();
          this.navctrl.navigateRoot('/home');


          });
          







          }




   
          
         
          
          



        }

        


      ]




    });
    (await confirm).present();


    



    
  }













}

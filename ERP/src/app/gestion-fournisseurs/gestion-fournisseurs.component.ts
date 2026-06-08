import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { MissionService } from '../mission.service';
import { environment } from '../../environments/environment'
import { IonDatetime, IonPopover } from '@ionic/angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-gestion-fournisseurs',
  templateUrl: './gestion-fournisseurs.component.html',
  styleUrls: ['./gestion-fournisseurs.component.scss'],
})
export class GestionFournisseursComponent  implements OnInit {

  public titre = "Gestion Fournisseurs"
  public fournisseurs : Fournisseur[] = [];
  public fournisseurs_origine : Fournisseur[] = [];
  public competences : any[] = [];


  constructor(
    private missionService: MissionService,
    private router: Router,
    private http: HttpClient,
    public datepipe: DatePipe,
    public userService : UserService) {

  }

  ngOnInit() {
    this.userService.getfournisseurs().subscribe((res: any) => {
      console.log(res);
      this.fournisseurs_origine=res
      this.fournisseurs=res
  })

  this.userService.getCompetences().subscribe((res: any) => {
    console.log(res);
    this.competences=res
})

}

goToFournisseur(item : Fournisseur){
    this.missionService.currentFournisseur = item;
    this.router.navigateByUrl('/modifierFournisseur', { state: { fournisseur: item }});
}

getCompetences(competences:Competence[]){
  return Array.prototype.concat(competences.map(cmp =>cmp.type))
}

filterFournisseurs(competence :  any){
  if(competence){
    this.fournisseurs = this.fournisseurs_origine.filter(fournisseur => fournisseur.competences.map(cmp => cmp.type).includes(competence))
  }
  else{
    this.fournisseurs = this.fournisseurs_origine;
  }
}


goAddFournisseur(){
  this.router.navigate(['/addFournisseur'], {replaceUrl: true});
}




}

export interface Fournisseur{
    id?:number | null ;
    nom: string;
    tele:string;
    email: string;
    type:string
    description: string
    certifications: Certification[]
    competences: Competence[]
    produits : Produit[]
 }

export interface Produit{
    id? : number | null ,
    nom : string;
}


export interface Certification{
    id? : number | null;
    type : string;
}

export interface Competence {
    id? : number | null ;
    type : string;
}



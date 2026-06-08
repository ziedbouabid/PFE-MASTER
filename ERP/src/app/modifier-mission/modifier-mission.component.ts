import { Fournisseur } from './../gestion-fournisseurs/gestion-fournisseurs.component';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Mission } from '../gestion-mission/gestion-mission.component';
import { MissionService } from '../mission.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../user.service';

@Component({
  selector: 'app-modifier-mission',
  templateUrl: './modifier-mission.component.html',
  styleUrls: ['./modifier-mission.component.scss'],
})
export class ModifierMissionComponent implements OnInit {
  public titre = "Modifier Mission"
  public fournisseurs: Fournisseur[] = [];
  public mission: Mission = {
    id: 0,
    type: '',
    client: '',
    description: '',
    datedebut: '',
    datefin: '',
    statut: '',
    produit: '',
    fournisseur: '',
    produits: []
  }

  public mission_origine: Mission = {
    id: 0,
    type: '',
    client: '',
    description: '',
    datedebut: '',
    datefin: '',
    statut: '',
    produit: '',
    fournisseur: '',
    produits: []
  }


  constructor(public userService: UserService, private missionService: MissionService, public activatedRoute: ActivatedRoute, public datepipe: DatePipe, private router: Router, private alertController: AlertController, private loadingCtrl: LoadingController, public formBuilder: FormBuilder, private http: HttpClient) {
  }


  missionProducts : any = []
  ngOnInit() {
    console.log(this.userService.userinfos?.role)
    const state = this.router.getCurrentNavigation()?.extras.state
    if (state && state != undefined) {
      this.mission = state['mission'] as Mission
      if(this.mission?.produit?.length){
        this.missionProducts = this.mission.produit.split(";")

      }
    }
    this.userService.getfournisseurs().subscribe((res: any) => {
      console.log(res);
      this.fournisseurs = res
    })
  }

  ajouterProduit() {
    this.mission.produits.push({
      id: 0,
      nom: '',
      fournisseurs: []
    })
  }

  ajouterFournisseur(fournisseur: Fournisseur) {
  }


  supprimerProduit(index: number) {
    delete this.mission.produits[index]
  }



  saveMission() {
    console.log(this.mission)
    this.missionService.saveMission(this.mission).subscribe((res: any) => {
      this.mission = this.mission_origine
      console.log(res);
      this.router.navigate(['/gestionMission'], { replaceUrl: true });
    },
      (err) => {
        this.alertController.create({
          message: 'Un problème lors de modification de la mission !',
          buttons: ['OK']
        }).then(res => {

          res.present();

        });
      }
    );

  }


  accepterMission() {
    this.mission.statut = 'Accepté'
    this.missionService.saveMission(this.mission).subscribe((res: any) => {
      this.mission = this.mission_origine
      console.log(res);
      this.router.navigateByUrl('/gestionMission')
    },
      (err) => {
        this.alertController.create({
          message: 'Un problème lors de modification de la mission !',
          buttons: ['OK']
        }).then(res => {

          res.present();

        });
      }
    );

  }


  refuserMission() {
    this.mission.statut = "Refusé"
    this.missionService.saveMission(this.mission).subscribe((res: any) => {
      this.mission = this.mission_origine
      console.log(res);
      this.router.navigate(['/gestionMission'], { replaceUrl: true });
    },
      (err) => {
        this.alertController.create({
          message: 'Un problème lors de modification de la mission !',
          buttons: ['OK']
        }).then(res => {

          res.present();

        });
      }
    );

  }

  compareObject(a: any, b: any) {
    return a.id === b.id;
  }

}


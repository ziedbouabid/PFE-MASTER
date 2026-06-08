import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Mission } from '../gestion-mission/gestion-mission.component';
import { User, UserService } from '../user.service';
import { Validators } from '@angular/forms';
import { MissionService } from '../mission.service';


@Component({
  selector: 'app-create-mission',
  templateUrl: './create-mission.component.html',
  styleUrls: ['./create-mission.component.scss'],
})
export class CreateMissionComponent  implements OnInit {

  public titre = "Créer Mission"

  public mission: Mission = {
    id: 0,
    type: '',
    client: '',
    description: '',
    datedebut: '',
    datefin: '',
    statut: 'en attente',
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
    statut: 'en attente',
    produit: '',
    fournisseur: '',
    produits: []
  }


  constructor(public missionService: MissionService, public activatedRoute: ActivatedRoute, private router: Router, private alertController: AlertController, private loadingCtrl: LoadingController, public formBuilder: FormBuilder, private http: HttpClient,  private navCtrl: NavController ) {
  }


  ngOnInit() {}

  saveMission() {
    this.missionService.saveMission(this.mission).subscribe((res: any) => {
        this.mission = this.mission_origine
        console.log(res);
        this.alertController.create({
          message: "La mission a été créé avec succès !",
          buttons: ['OK']
        }).then(res => res.present());
        this.router.navigate(['/gestionMission'], { replaceUrl: true });
      }, (err) => {
          this.alertController.create({
            message: 'Ajout mission echouée !',
            buttons: ['OK']
          }).then(res => {

            res.present();

          });
        }
      );

  }


}

import { Fournisseur } from './../gestion-fournisseurs/gestion-fournisseurs.component';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { MissionService } from '../mission.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../user.service';

@Component({
  selector: 'app-ajouter-fournisseur',
  templateUrl: './ajouter-fournisseur.component.html',
  styleUrls: ['./ajouter-fournisseur.component.scss'],
})
export class AjouterFournisseurComponent implements OnInit {

  public titre = "Ajouter Fournisseurs"
  public fournisseur: any = {
    nom: '',
    tele: '',
    email: '',
    type: '',
    description: '',
    certifications: [{
      type: ''
    }],
    competences: [{
      type: ''
    }],
    produits: []
  }

  public fournisseur_origine: any = {
    nom: '',
    tele: '',
    email: '',
    type: '',
    description: '',
    certifications: [{
      type: ''
    }],
    competences: [{
      type: ''
    }],
    produits: []
  }


  constructor(
    private missionService: MissionService,
    public datepipe: DatePipe,
    private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    private userService: UserService) {

  }

  ngOnInit() {

  }

  ajouterCertification() {
    this.fournisseur.certifications.push({
      type: ''
    })
  }

  ajouterCompetence() {
    this.fournisseur.competences.push({
      type: ''
    })

  }


  supprimerCertification(index: number) {
    delete this.fournisseur.certifications[index]
  }

  supprimerCompetence(index: number) {
    delete this.fournisseur.competences[index]

  }

  saveFournisseur() {
    console.log(this.fournisseur)
    this.userService.saveFournisseur(this.fournisseur).subscribe((res: any) => {
      this.fournisseur = this.fournisseur_origine
      console.log(res);

      this.router.navigateByUrl('/gestionFournisseurs')
    },
      (err) => {
        this.alertController.create({
          message: 'Un problème lors de ajout de fournisseur  !',
          buttons: ['OK']
        }).then(res => {

          res.present();

        });
      }
    );

  }


}



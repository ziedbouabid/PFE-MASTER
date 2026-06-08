import { Fournisseur } from './../gestion-fournisseurs/gestion-fournisseurs.component';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { MissionService } from '../mission.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-modifier-fournisseur',
  templateUrl: './modifier-fournisseur.component.html',
  styleUrls: ['./modifier-fournisseur.component.scss'],
})
export class ModifierFournisseurComponent implements OnInit {
  public titre = "Modifier Fournisseur"
  public fournisseur: Fournisseur = {
    id: 0,
    nom: '',
    tele: '',
    email: '',
    type: '',
    description: '',
    certifications: [{
      id: null,
      type: ''
    }],
    competences: [{
      id: null,
      type: ''
    }],
    produits: []
  }

  public fournisseur_origine: Fournisseur = {
    id: 0,
    nom: '',
    tele: '',
    email: '',
    type: '',
    description: '',
    certifications: [{
      id: null,
      type: ''
    }],
    competences: [{
      id: null,
      type: ''
    }],
    produits: []
  }


  constructor(private missionService: MissionService,
    public userService: UserService,
    public activatedRoute: ActivatedRoute,
    public datepipe: DatePipe,
    private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const state = this.router.getCurrentNavigation()?.extras.state
    if (state && state != undefined) {
      this.fournisseur = state['fournisseur'] as Fournisseur
    }
  }

  ajouterCertification() {
    this.fournisseur.certifications.push({
      id: null,
      type: ''
    })
  }

  ajouterCompetence() {
    this.fournisseur.competences.push({
      id: null,
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
    this.userService.updateFournisseur(this.fournisseur).subscribe((res: any) => {
      this.fournisseur = this.fournisseur_origine
      console.log(res);
      this.router.navigate(['/gestionFournisseurs'], { replaceUrl: true });
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



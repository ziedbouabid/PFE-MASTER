import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Mission } from '../gestion-mission/gestion-mission.component';
import { Fournisseur } from '../gestion-fournisseurs/gestion-fournisseurs.component';
import { environment } from 'src/environments/environment';
import { User, UserService } from '../user.service';
import { Validators } from '@angular/forms';



@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {

  public titre = "Créer Utilisateur"

  public user: User = {
    id: 0,
    nom: 'AA',
    prenom: '',
    role: 'Admin',
    poste: '',
    email: 'aa@gmail.com',
    password: 'AAAAAA',
    tele: '',
    statut: ''
  }

  public user_origine: User = {
    id: 0,
    nom: '',
    prenom: '',
    role: '',
    poste: '',
    email: '',
    password: '',
    tele: '',
    statut: ''
  }

  tele = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('[0-9 ]{8}')
  ]);



  constructor(public userService: UserService, public activatedRoute: ActivatedRoute, private router: Router, private alertController: AlertController, private loadingCtrl: LoadingController, public formBuilder: FormBuilder, private http: HttpClient, private navCtrl: NavController) {
  }

  ngOnInit() {

  }
  goTowelcome() {
    this.router.navigate(['/welcome'], { replaceUrl: true });
  }

  saveUser() {
    this.userService.saveUser(this.user).subscribe((res: any) => {
      this.user = this.user_origine
      console.log(res);
      this.alertController.create({
        message: "L'utilisateur a été créé avec succès !",
        buttons: ['OK']
      }).then(res => res.present());
      this.goTowelcome()
    }, (err) => {
      this.alertController.create({
        message: 'Ajout utilisateur echouée !',
        buttons: ['OK']
      }).then(res => {

        res.present();

      });
    }
    );

  }


}




import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-create-employes',
  templateUrl: './create-employes.component.html',
  styleUrls: ['./create-employes.component.scss'],
})
export class CreateEmployesComponent implements OnInit {
  public titre = "Modifier Employé"
  public employe: User = {
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

  public employe_origine: User = {
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


  constructor(public userService: UserService, public activatedRoute: ActivatedRoute, public datepipe: DatePipe, private router: Router, private alertController: AlertController, private loadingCtrl: LoadingController, public formBuilder: FormBuilder, private http: HttpClient) {
  }


  missionProducts: any = []
  ngOnInit() {
    console.log(this.userService.userinfos?.role)
    const state = this.router.getCurrentNavigation()?.extras.state
    if (state && state != undefined) {
      this.employe = state['user'] as User
    }
  }

  updateUser() {
    this.userService.updateUser(this.employe).subscribe((res: any) => {
      this.employe = this.employe_origine
      console.log(res);
      this.router.navigate(['/gestionemployes'], { replaceUrl: true });
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
}

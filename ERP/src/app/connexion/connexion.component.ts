import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { DataService } from '../data.service';
import { UserService } from '../user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../storage.service';
import { environment } from './../../environments/environment';


export const TOKEN_KEY = 'jwt-token';
const helper = new JwtHelperService();

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent  implements OnInit {

  public signInEmail?: string;
  public signInPassword: string | undefined;
  public jwt: string | undefined;
  public isSubmitted = false;
  public is_cred_false = false;

  constructor(private userService: UserService, private router:Router,private storageService: StorageService,private  alertController: AlertController,private http: HttpClient , private navCtrl: NavController, private dataService: DataService
    ){
  }
  goTopassword() {
    this.router.navigate(['/forgetPassword'], {replaceUrl: true});
  }

  goTowelcome() {
    this.router.navigate(['/welcome'], {replaceUrl: true});
  }
  signIn(){
    this.isSubmitted = true;
    let credentials = {
      username: this.signInEmail,
      password: this.signInPassword
    }
    this.userService.signIn(credentials).subscribe((res: any) => {
      console.log(res);
      // NOTE: This is just for testing, typically you would store the JWT in local storage and retrieve from there
      this.jwt = res.access_token;
      this.storageService.set(TOKEN_KEY,this.jwt)
      this.userService.isAuthenticated.next(true);
      console.log(this.storageService.get(TOKEN_KEY));
      let decoded = helper.decodeToken(this.jwt as string);
      this.userService.userData.next(decoded);
      this.router.navigate(['/welcome'], {replaceUrl: true});
     // this.navCtrl.navigateForward('/welcome')
    },
    (err) => {
      this.alertController.create({
        message: 'email ou mot de passe invalide !',
        buttons: ['OK']
      }).then(res => {

        res.present();

      });
    }
    );
  }
  testRoute(){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.jwt)
    this.userService.testRoute(headers).subscribe((res) => {
      console.log(res);
    });
  }
   ngOnInit() {

  }

}

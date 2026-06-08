import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { Fournisseur } from './gestion-fournisseurs/gestion-fournisseurs.component';
import { Mission } from './gestion-mission/gestion-mission.component';



const helper = new JwtHelperService();
export const TOKEN_KEY = 'jwt-token';

export interface User {
  email: string
  id: number
  tele?: string
  secondeRole?: string
  nom: string
  password: string
  prenom: string
  role: string
  poste: string
  statut : string
}

export interface createUser {
  email: string
  nom: string
  password: string
  prenom: string
  poste: string
  tele: string
  role: string
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: Observable<any> = of(null);
  isAuthenticated: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public userData = new BehaviorSubject(null);

  public userinfos: any = null;

  constructor(private storageService: StorageService, private http: HttpClient, private router: Router) {

    this.loadStoredToken();
  }

  async loadStoredToken() {
    const token = await this.storageService.get(TOKEN_KEY);
    if (token && token.value) {
      let decoded = helper.decodeToken(token.value);
      this.userData.next(decoded);
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  getUserToken() {
    return this.userData.getValue();
  }


  getUserData() {
    const email = this.getUserToken()?.['email'];
    return this.http.get<User>(`${environment.backend}/users/getUser/${email}`)
  }

  saveFournisseur(fournisseur: any) {
    return this.http.post(environment.backend + '/fournisseur/saveFournisseur', fournisseur)
  }
  signIn(credentials: any) {
    return this.http.post(environment.backend + '/auth/login', credentials)
  }

  testRoute(headers: any) {
    return this.http.get('http://localhost:3000/users/test', { headers: headers })
  }

  saveUser(user: any) {
    return this.http.post(environment.backend + '/users/addUser/', user)
  }

  updateUser(user: User) {
    return this.http.post(environment.backend + '/users/updateUser/', user)

  }
  getChplns() {
    return this.http.get<User[]>(environment.backend + `/users/getChplns/`)
  }
  getEmployes() {
    return this.http.get<User[]>(environment.backend + `/users/getEmployes/`)
  }

  getfournisseurs() {
    return this.http.get<Fournisseur[]>(environment.backend + `/fournisseur/getfournisseurs/`)
  }

  getCompetences() {
    return this.http.get<any[]>(environment.backend + `/competences/getCompetences/`)
  }

  updateFournisseur(fournisseur: any) {
    return this.http.post(environment.backend + '/fournisseur/updateFournisseur', fournisseur)
  }

  logout() {
    this.storageService.remove(TOKEN_KEY);
    this.router.navigate(['/connexion'], { replaceUrl: true });
    this.userData.next(null);
    this.userinfos = null;
  }
}

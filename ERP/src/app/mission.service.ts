import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Fournisseur } from './gestion-fournisseurs/gestion-fournisseurs.component';
import { Mission } from './gestion-mission/gestion-mission.component';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  public currentMission: Mission;
  public currentFournisseur: Fournisseur;

  constructor(private http: HttpClient) { }

  setMission(item: Mission) {
    this.currentMission = item;
  }

  getMission() {
    return this.currentMission;
  }

  setFournisseur(item: Fournisseur) {
    this.currentFournisseur = item;
  }

  getFournisseur() {
    return this.currentFournisseur;
  }
  getMissions() {
    return this.http.get<Mission[]>(environment.backend + `/missions/getMissions/`)
  }
  saveMission(mission: any) {
    return this.http.post(environment.backend + '/missions/saveMission/', mission)
  }
}


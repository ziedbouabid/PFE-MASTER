import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Commande } from './gestion-commande/gestion-commande.component';

@Injectable({
  providedIn: 'root'
})
export class Commandeservice {
  router: any;


  constructor(private http: HttpClient) { }

  getCommandes() {
    return this.http.get<Commande[]>(environment.backend + `/commandes`)
  }
  saveCommande(commande: Commande) {
    return this.http.post(environment.backend + '/commandes', commande)
  }
  goToCreateCommande(){
    this.router.navigate(['/createcommande'], {replaceUrl: true});
    
  }
}


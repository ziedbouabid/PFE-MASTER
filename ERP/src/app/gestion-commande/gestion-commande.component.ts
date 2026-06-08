import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commandeservice } from '../gestion-commande.service';
import { Fournisseur } from '../gestion-fournisseurs/gestion-fournisseurs.component';
import { Mission } from '../gestion-mission/gestion-mission.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-gestion-commande',
  templateUrl: './gestion-commande.component.html',
  styleUrls: ['./gestion-commande.component.scss'],
})
export class GestionCommandeComponent implements OnInit {

  public titre = "Gestion Commandes"
  public commandes: Commande[] = [];
  public commandes_origine: Commande[] = [];



  constructor(public userService: UserService,private commandesService: Commandeservice, private router: Router, private http: HttpClient, public datepipe: DatePipe) {

  }

  ngOnInit() {
    console.log("this.userService.userinfos?.role : ",this.userService.userinfos?.role);
    
    this.commandesService.getCommandes().subscribe((res: any) => {
      console.log(res);
      this.commandes = res
      this.commandes_origine = res
    })
  }

  goToCommande(item: Commande) {
    const state = this.router.getCurrentNavigation()?.extras.state
    if (state && state != undefined) {
      state['Commande'] = null
    }
    this.router.navigateByUrl('/modifiercommande', { state: { Commande: item } });
  }

  filterCommandes(statut: any) {
    if (statut) {
      this.commandes = this.commandes_origine.filter(Commande => Commande.mission?.statut == statut)
    }
    else {
      this.commandes = this.commandes_origine;
    }
  }
  goToCreateCommande() {
    this.router.navigate(['/createcommande'], { replaceUrl: true });

  }

}

export interface Commande {
  id: number | null;
  description: string;
  mission?: Mission
  missionId: number | null
}


export interface Produit {
  id: number | null;
  nom: string;
  fournisseurs: Fournisseur[]
}

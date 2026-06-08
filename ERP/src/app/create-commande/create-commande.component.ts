import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Commandeservice } from '../gestion-commande.service';
import { Commande } from '../gestion-commande/gestion-commande.component';
import { Mission } from '../gestion-mission/gestion-mission.component';
import { MissionService } from '../mission.service';

@Component({
  selector: 'app-create-commande',
  templateUrl: './create-commande.component.html',
  styleUrls: ['./create-commande.component.scss'],
})
export class CreateCommandeComponent implements OnInit {

  public titre = "Créer commande"

  public commande: Commande = {
    id: 0,
    description: '',
    missionId: null,
  }

  public Commande_origine: Commande = {
    id: 0,
    description: '',
    missionId : null

  }


  constructor(public commandeService: Commandeservice,
    public missionService: MissionService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    public formBuilder: FormBuilder) {
  }

  missions : Mission[] = []
  selectedMission: Mission 
  
  onSelectChange(event:any){
    console.log("event : ",event)
  }

  ngOnInit() {

    this.missionService.getMissions().subscribe((res: Mission[]) => {
      console.log(res);
      this.missions = res
    })
  }

  savecommande() {
    this.commande.missionId = this.selectedMission.id
    console.log("commande to be created : ",this.commande)
    this.commandeService.saveCommande(this.commande).subscribe((res: any) => {
      this.commande = this.Commande_origine
      console.log(res);
      this.alertController.create({
        message: "La commande a été créé avec succès !",
        buttons: ['OK']
      }).then(res => res.present());
      this.router.navigate(['/gestioncommande'], { replaceUrl: true });
    }, (err: any) => {
      this.alertController.create({
        message: 'Ajout commande echouée !',
        buttons: ['OK']
      }).then(res => {

        res.present();

      });
    }
    );

  }


}

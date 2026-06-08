import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import jsPDF from 'jspdf';
import { Commandeservice } from '../gestion-commande.service';
import { Commande } from '../gestion-commande/gestion-commande.component';
import { Mission } from '../gestion-mission/gestion-mission.component';
import { MissionService } from '../mission.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-modifier-commande',
  templateUrl: './modifier-commande.component.html',
  styleUrls: ['./modifier-commande.component.scss'],
})
export class ModifierCommandeComponent  implements OnInit {

  public titre = "Afficher commande"

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


  constructor(
    public userService: UserService,
    public commandeService: Commandeservice,
    public missionService: MissionService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private datePipe: DatePipe,
    public formBuilder: FormBuilder) {
  }

  missions : Mission[] = []
  selectedMission: Mission 
  
  onSelectChange(event:any){
    console.log("event : ",event)
  }

  ngOnInit() {
    console.log(this.userService.userinfos?.role)
    const state = this.router.getCurrentNavigation()?.extras.state
    if (state && state != undefined) {
      this.commande = state['Commande'] as Commande
      if(this.commande.mission)this.selectedMission=this.commande.mission
    }
    this.missionService.getMissions().subscribe((res: Mission[]) => {
      console.log(res);
      this.missions = res
    })
  }

  getComponentDataAsString(): string {
    // Implement the logic to extract and format your component's data.
    // You can concatenate the data into a string and return it.
    // For example, you can format the data from your component's template.
    const datedebut = this.datePipe.transform(this.selectedMission.datedebut, 'longDate');
    const datefin = this.datePipe.transform(this.selectedMission.datefin, 'longDate');

    return `
      Client: ${this.selectedMission.client}
      Statut: ${this.selectedMission.statut}
      Type: ${this.selectedMission.type}
      Description: ${this.selectedMission.description}
      Date début: ${datedebut}
      Date fin: ${datefin}
      Produits: ${this.selectedMission.produit}
    `;
  }

  generationFacture() {

    const doc = new jsPDF();

     // Measure the width of the title text.
     const titleWidth = doc.getStringUnitWidth(this.titre) * 20 / doc.internal.scaleFactor;

     // Calculate the x-coordinate to center-align the title.
     const centerX = (doc.internal.pageSize.width - titleWidth) / 2;

     
    doc.setFontSize(30);
    doc.text(this.commande.description, centerX, 10);


    doc.setFontSize(20);
     doc.text(this.getComponentDataAsString(), 10, 30);


    // Add more content as needed.
    doc.save('my-document.pdf');
  }

}

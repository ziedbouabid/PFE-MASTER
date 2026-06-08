import { importProvidersFrom, NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { SharedModule } from './shared/shared.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { GestionMissionComponent } from './gestion-mission/gestion-mission.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ModifierMissionComponent } from './modifier-mission/modifier-mission.component';
import { GestionFournisseursComponent } from './gestion-fournisseurs/gestion-fournisseurs.component';
import { ModifierFournisseurComponent } from './modifier-fournisseur/modifier-fournisseur.component';
import { AjouterFournisseurComponent } from './ajouter-fournisseur/ajouter-fournisseur.component';
import { GestionEmployes } from './gestion-employes/gestion-employes.component';
import { CreateMissionComponent } from './create-mission/create-mission.component';
import { GestionCommandeComponent } from './gestion-commande/gestion-commande.component';
import { FormsModule } from '@angular/forms';
import { CreateCommandeComponent } from './create-commande/create-commande.component';
import { ModifierCommandeComponent } from './modifier-commande/modifier-commande.component';
import { CreateEmployesComponent } from './create-employes/create-employes.component';

@NgModule({
  declarations: [AppComponent,AjouterFournisseurComponent,ModifierFournisseurComponent,
    HeaderComponent,GestionFournisseursComponent,WelcomeComponent,ConnexionComponent,
    GestionEmployes,
    CreateUserComponent,CreateEmployesComponent,GestionMissionComponent,ForgetPasswordComponent,ModifierMissionComponent, AcceuilComponent, CreateMissionComponent, GestionCommandeComponent, CreateCommandeComponent,ModifierCommandeComponent],

  imports: [RouterModule,FormsModule, AppRoutingModule,HttpClientModule,SharedModule,IonicModule.forRoot({
    mode: 'ios',
    scrollAssist: false,
    scrollPadding: false
  }),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },importProvidersFrom(IonicStorageModule.forRoot()),DatePipe],
  bootstrap: [AppComponent],
  exports:[HeaderComponent]
})
export class AppModule {}

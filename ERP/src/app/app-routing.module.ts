import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AjouterFournisseurComponent } from './ajouter-fournisseur/ajouter-fournisseur.component';
import { AuthGuard } from './auth.guard';
import { ConnexionComponent } from './connexion/connexion.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { GestionFournisseursComponent } from './gestion-fournisseurs/gestion-fournisseurs.component';
import { GestionMissionComponent } from './gestion-mission/gestion-mission.component';
import { HeaderComponent } from './header/header.component';
import { ModifierFournisseurComponent } from './modifier-fournisseur/modifier-fournisseur.component';
import { ModifierMissionComponent } from './modifier-mission/modifier-mission.component';
import { RoleGuard } from './role.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { GestionEmployes } from './gestion-employes/gestion-employes.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { CreateMissionComponent } from './create-mission/create-mission.component';
import { GestionCommandeComponent } from './gestion-commande/gestion-commande.component';
import { CreateCommandeComponent } from './create-commande/create-commande.component';
import { ModifierCommandeComponent } from './modifier-commande/modifier-commande.component';
import { CreateEmployesComponent } from './create-employes/create-employes.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'connexion',
    pathMatch: 'full'
  },
  {
    path:'connexion',
    component: ConnexionComponent,
  },
  {path: 'welcome',
    component: WelcomeComponent,
    canActivate : [AuthGuard,RoleGuard],
    data: {
      roles: ['Admin','CHPLA','RSPLA','RSRH',"RSCM","CHCM"]
    }
  },
  {path: 'createUser',
  component: CreateUserComponent,
  canActivate : [AuthGuard,RoleGuard],
    data: {
      roles: ['Admin','RSRH','CHRH']
    }
  },
  
   
  {path: 'gestionMission',
  component: GestionMissionComponent,
  canActivate : [AuthGuard,RoleGuard],
  data: {
    roles: ['Admin','CHPLA','RSPLA','RSCM','CHCM']
  }
  },
  {path: 'forgetPassword',
  component: ForgetPasswordComponent,
  },
  {path: 'modifierMission',
  component: ModifierMissionComponent,
  canActivate : [AuthGuard,RoleGuard],
  data: {
    roles: ['Admin','Planning','CHPLA','RSCM','CHCM']
  }

  },
  {path: 'gestionFournisseurs',
  component: GestionFournisseursComponent,
  canActivate : [AuthGuard,RoleGuard],
  data: {
    roles: ['Admin','Planning','CHPLA','RSPLA']
  }
  },
  {path: 'modifierFournisseur',
  component: ModifierFournisseurComponent,
  canActivate : [AuthGuard,RoleGuard],
  data: {
    roles: ['Admin','Planning','CHPLA','RSPLA']
  }
  },
  {path: 'addFournisseur',
  component: AjouterFournisseurComponent,
  canActivate : [AuthGuard,RoleGuard],
  data: {
    roles: ['Admin','Planning','CHPLA','RSPLA']
  }
  },
  {path: 'gestionemployes',
  component: GestionEmployes,
  },
  {path: 'createemployes',
  component: CreateEmployesComponent,
  },
  {path: 'acceuil',
  component: AcceuilComponent,
  },
  {path: 'createmission',
  component: CreateMissionComponent,
  },
  {path: 'gestioncommande',
  component: GestionCommandeComponent,
  },
  {path: 'createcommande',
  component: CreateCommandeComponent,
  },
  {path: 'modifiercommande',
  component: ModifierCommandeComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

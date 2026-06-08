import { Component, OnInit,Input } from '@angular/core';
import { UserService } from '../user.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() title = ''; 
  constructor(public menuController:MenuController,private router:Router,public userService: UserService,private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
  }

  showMenu() {
    const menuid = 'slidingMenu';
    this.menuController.enable(true, menuid);
    this.menuController.get(menuid).then(
      (thisMenu) => {
        if (!thisMenu!.className.includes('menu-pane-visible')) {
          thisMenu!.className = `${thisMenu!.className} menu-pane-visible`;
        }
    });
  }

  logout(){
    this.userService.logout()
    this.router.navigateByUrl('/connexion')
  }

  goToGestionMisson(){
    this.router.navigate(['/gestionMission'], {replaceUrl: true});
    //this.router.navigateByUrl('/gestionMission')
  }
  goToGestionFournisseurs(){
    this.router.navigate(['/gestionFournisseurs'], {replaceUrl: true});
    
  }
  goToGestionCommande(){
    this.router.navigate(['/gestioncommande'], {replaceUrl: true});
    
  }

  goToConnexion(){
    this.router.navigate(['/connexion'], {replaceUrl: true});
    this.router.navigateByUrl('/connexion')
  }

  goToCreateUser(){
    this.router.navigate(['/createUser'], {replaceUrl: true});
    //this.router.navigateByUrl('/createUser')
  }
  

  goToWelcome(){
    this.router.navigate(['/welcome'], {replaceUrl: true});
    //this.router.navigateByUrl('/welcome')
  }

  goCharcherPLN(){
    this.router.navigate(['/gestionemployes'], {replaceUrl: true});
    //this.router.navigateByUrl('/welcome')
  }

}

import { Component, OnInit } from '@angular/core';
import { MissionService } from '../mission.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-gestion-employes',
  templateUrl: './gestion-employes.component.html',
  styleUrls: ['./gestion-employes.component.scss'],
})
export class GestionEmployes implements OnInit {

  roles = [
    {label : 'RH',value: 'CHRH'}, 
    {label : 'Commercial',value: 'CHCM'}, 
    {label : 'Planning',value: 'CHPLA'},
  ];
  public titre = "Gestion des employés"
  public employes: User[] = [];
  public employes_origine: User[] = [];

  constructor(
    private missionService: MissionService,
    private router: Router,
    private http: HttpClient,
    public datepipe: DatePipe,
    private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getEmployes().subscribe((res: any) => {
      console.log(res);
      this.employes = res
      this.employes_origine = res
    })
  }
  filterEmployes(role: any) {
    if (role) {
      this.employes = this.employes_origine.filter(emp => emp.role == role)
    }
    else {
      this.employes = this.employes_origine;
    }
  }

  goAddUser() {
    this.router.navigateByUrl('/createemployes')
  }
  goToEditUser(user: User) {
    const state = this.router.getCurrentNavigation()?.extras.state
    if (state && state != undefined) {
      state['user'] = null
    }
    this.router.navigateByUrl('/createemployes', { state: { user } })
  }

}



import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private auth:AuthService,
              private route: Router) { }

  ngOnInit() {
  }
  salir() {
    this.auth.logOut();
    this.route.navigateByUrl('/login');
  }
}

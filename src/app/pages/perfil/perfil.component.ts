import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { UserInterface } from '../../models/profile-interface';
import { MessageInterface } from '../../models/message-interface';
import { NgForm } from '@angular/forms'
import { Location } from '@angular/common'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private auth:AuthService,
              private route: Router) { }
  
  public profile : UserInterface;
  public messages : MessageInterface = {
    body: '',
  }

  ngOnInit() {
    this.showProfile();
    this.showComments();
  }

  showProfile() {
    this.auth.getUserActive()
    .subscribe((profile : UserInterface) => (this.profile = profile))
  }
  
  showComments() {
    this.auth.getAllComments()
    .subscribe((messages : MessageInterface) => (this.messages = messages['data']))
  }

  sendComment( chatForm: NgForm) {
    this.auth.createComment(this.messages.body)
    .subscribe(resp => {
      console.log(resp);
      location.reload()
    })
  }
  salir() {
    this.auth.logOut();
    this.route.navigateByUrl('/login');
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserInterface } from '../../models/profile-interface';
import { MessageInterface } from '../../models/message-interface';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

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

  sendComment() {
    this.auth.createComment(this.messages.body)
    .subscribe(resp => console.log(resp))
  }
  salir() {
    this.auth.logOut();
    this.route.navigateByUrl('/login');
  }
}

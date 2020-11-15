import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/AuthService/auth.service';

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pit';
  // isLogged;

  /**
   *
   */
  constructor(private afAuth: AuthService, private router: Router) {
    
  }

  ngOnInit(): void {    
    // this.isLogged = this.afAuth.isLogged()
    // this.isLogged.subscribe(event => console.log(event.uid))
    
  }



}

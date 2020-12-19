import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/AuthService/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isLoggedIn: boolean = false


  constructor(private afAuth: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.afAuth.isLoggedIn;
    // console.log(this.isLoggedIn$);
    // console.log(this.afAuth.isLoggedLocal());
    
    // if (this.afAuth.isLoggedLocal()) {
    //   this.isLoggedIn = true
    // }
  }

  cerrarSesion() {
    this.afAuth.cerrarSesion()
  }

}

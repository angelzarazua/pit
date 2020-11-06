import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/AuthService/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {

  formLogin: FormGroup;
  exprRegEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.compose([ Validators.required, Validators.pattern(this.exprRegEmail)])],
      password: ['', Validators.required],
    });
  }


  iniciarSesion(): void {
    this.authService.iniciarSesion(this.formLogin.value).then((res) => {
      console.log(res);
      if (res == '400') {
        console.log('Contraseña incorrecta');
      } else {
        console.exception(res);
      }
    }).catch(error => console.error(error))

  }

}

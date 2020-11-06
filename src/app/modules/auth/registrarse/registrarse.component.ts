import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/AuthService/auth.service';
import { Usuario } from '../../../shared/models/local';

declare const $: any;


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent implements OnInit {

  exprRegEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  reGexPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/i;
  formRegistro: FormGroup;
  url: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.formRegistro = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      numero_lista: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  registrarse() {
    this.authService.crearUsuario(this.formRegistro.value, this.formRegistro.get('password').value).then((res) => {
      switch (res) {

        case 'auth/invalid-email':
          console.error('Error: ', res);
          break;

        case 'auth/email-already-in-use':
          console.error('Error: ', res);
          break

        case 'auth/weak-password':
          console.error('Error: ', res);
          break;

        default:
          break;

      }
    }).catch((error) => console.log('Error inesperado', error))
  }


}

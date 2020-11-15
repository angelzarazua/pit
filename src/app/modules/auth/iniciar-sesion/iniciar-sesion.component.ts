import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/AuthService/auth.service';

declare const $: any;


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {

  formLogin: FormGroup;
  mostrarError: Boolean;
  msgError: string;
  exprRegEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  validationMessages = {
    email: [
      { type: 'required', message: 'Introduce el correo.' },
      {
        type: 'pattern', message: 'Introduce un correo válido.'
      },
    ],
    password: [
      { type: 'required', message: 'Introduce la contraseña.' }
    ]
  };
  isLoggedIn$: Observable<boolean>;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    // this.isLoggedIn$ = this.authService.isLoggedIn;
    // if (!this.isLoggedIn$) {
    //   this.router.navigate(['/inicio']);
    // }
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.exprRegEmail)])],
      password: ['', Validators.required],
    });

    this.mostrarError = false;

    this.jQuery();
  }

  // @HostListener('unloaded')
  // ngOnDestroy() {
  //   console.log('Items destroyed');
  // }


  iniciarSesion(): void {
    this.authService.iniciarSesion(this.formLogin.value).then((error) => {
      if (error.code !== false) {
        switch (error.code) {
          case 'auth/wrong-password':
            console.log('Contraseña incorrecta');
            this.setMsgError('Contraseña incorrecta');
            break;

          case 'auth/user-not-found':
            console.log('No existe un usuario con este correo');
            this.setMsgError('No existe un usuario con este correo');
            break;

          case 'auth/user-disabled':
            console.log('El usuario ha sido deshabilitado');
            this.setMsgError('La cuenta ha sido deshabilitado');
            break;

          case 'auth/invalid-email':
            console.log('El formato del email es inválido');
            this.setMsgError('El formato del email no es válido');
            break;

          case 'auth/too-many-requests':
            console.log('El acceso a esta cuenta ha sido temporalmente deshabilitado por tener muchas peticiones');
            this.setMsgError('Cuenta temporalmente deshabilitada por muchos intentos. Prueba más tarde');
            break;

          default:
            console.error(error);
            this.setMsgError('Error inesperado: ' + error)
            break;
        }
      }
    }).catch(error => console.error(error))
  }

  closeAlert() {
    this.mostrarError = false;
  }

  setMsgError(msgError: string) {
    this.msgError = msgError;
    this.mostrarError = true
  }

  jQuery() {
    $('.input100').each(function () {
      $(this).on('blur', function () {
        if ($(this).val().trim() != "") {
          $(this).addClass('has-val');
        }
        else {
          $(this).removeClass('has-val');
        }
      })
    })



    /*==================================================================
    [ Validacion ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function () {
      var check = true;

      for (var i = 0; i < input.length; i++) {
        if (validate(input[i]) == false) {
          showValidate(input[i]);
          check = false;
        }
      }

      return check;
    });


    $('.validate-form .input100').each(function () {
      $(this).focus(function () {
        hideValidate(this);
      });
    });

    function validate(input) {
      if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
        if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
          return false;
        }
      }
      else {
        if ($(input).val().trim() == '') {
          return false;
        }
      }
    }

    function showValidate(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).removeClass('alert-validate');
    }

  }

}

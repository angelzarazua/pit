import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/AuthService/auth.service';
import { validarQueSeanIguales } from '../../../shared/classes/validator';

declare const $: any;


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent implements OnInit {

  exprRegEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  reGexPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/i;
  validationMessages = {
    email: [
      { type: 'required', message: 'Introduce el correo.' },
      {
        type: 'pattern', message: 'Introduce un correo válido.'
      },
    ],
    password: [
      { type: 'required', message: 'Introduce la contraseña.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' },
      {
        type: 'pattern', message: 'La contraseña debe tener al menos un dígito, una letra minúscula, '
          + 'una letra mayúscula y un caracter especial.'
      }
    ],
    nombres: [
      { type: 'required', message: 'Este campo es requerido.' }
    ],
    apellido_paterno: [
      { type: 'required', message: 'Este campo es requerido.' }
    ],
    apellido_materno: [
      { type: 'required', message: 'Este campo es requerido.' }
    ],
    numero_lista: [
      { type: 'required', message: 'Este campo es requerido.' },
      { type: 'minlength', message: 'La longitud mínima es de 1 un dígito.' },
      { type: 'maxlength', message: 'La longitud máxima es de 3 dígitos.' }
    ],
    confirmarPassword: [
      // { type: 'required', message: 'Este campo es requerido.' },
      { type: 'noSonIguales', message: 'Las contraseñas no coinciden' },
    ]

  };

  formRegistro: FormGroup;
  mostrarError: Boolean;
  msgError: string;
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
      numero_lista: ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.maxLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.exprRegEmail)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmarPassword: ['', Validators.required]
    },
    {
      validators: validarQueSeanIguales
    })
    this.mostrarError = false;
    this.jQuery();
  }

  registrarse() {
    this.authService.crearUsuario(this.formRegistro.value, this.formRegistro.get('password').value).then((error) => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          console.error(error.code);
          this.setMsgError('Ya existe una cuenta con este correo');
          break;

        case 'auth/invalid-email':
          console.error(error.code);
          this.setMsgError('El correo no es válido');
          break;

        case 'auth/operation-not-allowed':
          console.error(error.code);
          this.setMsgError('No tienes permisos para hacer esto');
          break

        case 'auth/weak-password':
          console.error(error.code);
          this.setMsgError('La contraseña es muy débil');
          break;

        default: 
          console.error(error);
          this.setMsgError('Error inesperado: ' + error)
          break;

      }
    }).catch((error) => console.error('Error catch ', error))
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

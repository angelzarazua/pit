import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GruposService } from 'src/app/core/services/grupos/grupos.service';
import { Grupo, Usuario_Grupo } from 'src/app/shared/models/local';

declare const $: any;


@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.scss']
})
export class CrearGrupoComponent implements OnInit {
  grupos: any = []
  uid = localStorage.getItem('uid');
  formNuevoGrupo: FormGroup;
  show: boolean = false
  exprRegValido = /^\S/;
  validationMessages = {
    nombre: [
      { type: 'required', message: 'Introduce el nombre del Grupo.' },
      { type: 'pattern', message: 'Introduce el nombre del Grupo.' }
    ]
  };

  constructor(private grupoSerevice: GruposService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.formNuevoGrupo = this.formBuilder.group({
      // nombre: ['', Validators.compose([Validators.pattern(this.exprRegValido), Validators.required])],
      nombre: ['', Validators.compose([Validators.required])],
      descripcion: [''],
    });

    this.jQuery();
  }

  crearGrupo() {
    this.show = true
    const grupo: Grupo = {
      nombre: this.formNuevoGrupo.value.nombre.trim(),
      codigo_grupo: "",
      descripcion: this.formNuevoGrupo.value.descripcion.trim(),
      asignaturas: [],
      created_at: null,
      updated_at: null
    }
    console.log('Grupo: ', grupo);
    setTimeout(() => {
      this.show = false
      this.router.navigate(['/inicio']);
    }, 4000);
    // this.grupoSerevice.crearGrupo(grupo, this.uid).then(() => {
    //   console.log('Se creó');
    //   this.router.navigate(['/inicio']);
    // });
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

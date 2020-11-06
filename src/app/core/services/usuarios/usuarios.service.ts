import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../../../shared/models/local';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private afs: AngularFirestore,   // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    public datepipe: DatePipe,
    public router: Router
  ) { }

  
}

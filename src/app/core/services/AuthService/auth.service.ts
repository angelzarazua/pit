import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../../../shared/models/local';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private pathCollectionUsuarios: AngularFirestoreCollection;
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(
    private afs: AngularFirestore,   // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,
    private datepipe: DatePipe
  ) {
    this.verificar();
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  async crearUsuario(usuario: Usuario, password: string) {
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(usuario.email, password);
      const userFirebase = res.user;
      this.setDatosUsuario(userFirebase, usuario).catch(error => console.error(error))

    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode + ' ' + errorMessage);
      return error;
    }
  }

  async iniciarSesion(usuario: { email: string; password: string; }) {
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(usuario.email, usuario.password);
      this.getUsuario(res.user.uid).then(() => {
        this.loggedIn.next(true);
        this.router.navigate(['/inicio']);
        return { code: false }
      });
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorCode + ' ' + errorMessage);
      return error
    }
  }

  setDatosUsuario(usuarioFirebase, usuario) {
    return new Promise<void>((resolve) => {
      const datosUsuario: Usuario = {
        apellido_materno: usuario.apellido_materno,
        apellido_paterno: usuario.apellido_paterno,
        created_at: this.datepipe.transform(new Date(), 'long'),
        email: usuarioFirebase.email,
        nombres: usuario.nombres,
        numero_lista: usuario.numero_lista,
        photoURL: usuarioFirebase.photoURL,
        uid: usuarioFirebase.uid,
        displayName: usuarioFirebase.displayName,
        emailVerified: usuarioFirebase.emailVerified
      }

      this.pathCollectionUsuarios.doc(usuarioFirebase.uid).set(datosUsuario)
        .then(() => {
          console.log("Documento creado");
          localStorage.setItem('usuario', JSON.stringify(datosUsuario))
          localStorage.setItem('uid', JSON.stringify(datosUsuario.uid));
          this.loggedIn.next(true);
          this.router.navigate(['/inicio']);
        }).catch((error) => { console.error(error) });

      return resolve()
    })
  }

  getUsuario(uid) {
    return new Promise<void>((resolve) => {
      this.pathCollectionUsuarios.doc(uid).get().subscribe((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          localStorage.setItem('usuario', JSON.stringify(doc.data()));
          localStorage.setItem('uid', doc.data().uid);
        } else {
          // doc.data() will be undefined in this case
          console.log("El documento no existe!");
        }
      }, (error) => {
        console.log("Error getting document:", error);
      })
      return resolve()
    })

  }

  cerrarSesion() {
    return this.afAuth.signOut().then(() => {
      localStorage.clear()
      this.loggedIn.next(false);
      this.router.navigate(['/iniciar-sesion']);
    })
  }

  async verificar() {
    // await this.isLogged()
    this.pathCollectionUsuarios = this.afs.collection("usuarios");
    const usuario = localStorage.getItem('uid');
    if (usuario != null || usuario != undefined) {
      this.loggedIn.next(true);
    }
  }

  isLogged() {
    return new Promise(() => {
      this.afAuth.user.subscribe(user => {
        console.log('isLogged: ', user);
        if (user != null) {
          this.loggedIn.next(true);
        } else {
          this.loggedIn.next(false);
        }
      });
    })

  }
}


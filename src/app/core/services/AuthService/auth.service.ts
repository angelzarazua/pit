import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../../../shared/models/local';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private pathCollectionUsuarios: AngularFirestoreCollection;


  constructor(
    private afs: AngularFirestore,   // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,
    private datepipe: DatePipe
  ) {
    this.pathCollectionUsuarios = this.afs.collection("usuarios");
  }

  async crearUsuario(usuario: Usuario, password: string) {
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(usuario.email, password);
      const userFirebase = res.user;
      this.setDatosUsuario(userFirebase, usuario).catch(error => console.error(error))

    } catch (error_1) {
      // Handle Errors here.
      const errorCode = error_1.code;
      const errorMessage = error_1.message;
      console.log(error_1);
      return errorCode;
    }
  }

  async iniciarSesion(usuario) {
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(usuario.email, usuario.password);
      this.getUsuario(res.user.uid).then(() =>{
        this.router.navigate(['/inicio']);
        // location.href = "inicio"
      });
      } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        return '400'
      } else {
        console.error(error);
        return errorMessage
      }
    }
  }

  setDatosUsuario(usuarioFirebase, usuario) {
    return new Promise((resolve, reject) => {
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
          this.router.navigate(['/inicio']);
        }).catch((error) => { console.error(error)});

      return resolve()
    })
  }

  getUsuario(uid) {
    return new Promise((resolve) => {
      this.pathCollectionUsuarios.doc(uid).get().subscribe((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          localStorage.setItem('usuario', JSON.stringify(doc.data()));
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
      localStorage.removeItem('usuario');
      this.router.navigate(['/iniciar-sesion']);
    })
  }

}


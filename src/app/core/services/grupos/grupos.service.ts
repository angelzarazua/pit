import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Grupo, Usuario_Grupo, Rol } from '../../../shared/models/local';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';


@Injectable({
  providedIn: 'root'
})
export class GruposService {
  private refCollectionGruposUsuarios: AngularFirestoreCollection<Usuario_Grupo>;
  private refCollectionGrupos: AngularFirestoreCollection<Grupo>;
  private pathGruposUsuarios = "usuarios_grupos";
  private pathGrupos = "grupos";
  private batch = this.afs.firestore.batch()


  constructor(
    private afs: AngularFirestore,
    private fns: AngularFireFunctions
  ) {
    this.refCollectionGrupos = this.afs.collection<Grupo>(this.pathGrupos);
    this.refCollectionGruposUsuarios = this.afs.collection<Usuario_Grupo>(this.pathGruposUsuarios)
  }



  async crearGrupo(grupo: Grupo, usuarioId: string) {
    try {
      grupo.created_at = new Date()
      const docRef = await this.refCollectionGrupos.add(grupo)
      const rol = Rol.admin
      grupo.codigo_grupo = docRef.id.substring(0, 6)
      console.log('crear grupo');
      this.batch.update(this.refCollectionGrupos.doc(docRef.id).ref, grupo)
      await this.batch.commit()
      const usuarioGrupo = this.crearUsuarioGrupo(usuarioId, docRef.id, rol, grupo.nombre, grupo.descripcion)
      await this.enlazarUsuarioConGrupo(usuarioGrupo)
      // this.router.navigate(['/inicio']);
      console.log("Documento creado");
    } catch (error) {
      console.error(error);
    }
  }

  editarGrupo(grupo: Grupo, id: string): Observable<any> {
    console.log('Entro al service');
    const callable = this.fns.httpsCallable('editarGrupo');
    const data$ = callable({
      id,
      grupo
    });
    return data$
  }

  obtenerGruposPorIdUsuario(usuarioId: string)/*: AngularFirestoreCollection<Usuario_Grupo>*/ {
    return this.afs.collection(this.pathGruposUsuarios, ref =>
      ref.where('usuario_id', "==", usuarioId).orderBy('created_at')
    ).valueChanges()
  }

  obtenerGrupoPorId(grupoId: string): Observable<any>/*: AngularFirestoreCollection<Grupo>*/ {
    return this.refCollectionGrupos.doc(grupoId).snapshotChanges().pipe(
      map(changes =>
        changes.payload.data()
      )
    )
  }

  crearUsuarioGrupo(usuarioId: string, grupoId: string, rol: Rol, nombre: string, descripcion: string): Usuario_Grupo {
    const usuarioGrupo: Usuario_Grupo = {
      usuario_id: usuarioId,
      grupo_id: grupoId,
      nombre: nombre,
      descripcion: descripcion,
      roles: [rol],
      created_at: new Date(),
      updated_at: null
    }
    return usuarioGrupo
  }

  async enlazarUsuarioConGrupo(usuarioGrupo: Usuario_Grupo) {
    try {
      const docRef = await this.refCollectionGruposUsuarios.add(usuarioGrupo)
      // usuarioGrupo.id = docRef.id
      // await this.editarUsuarioGrupo(usuarioGrupo)
    } catch (error) {
      console.error("Error al enlazar Usuario con Grupo: ", error);
    }
  }

}

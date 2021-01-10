import * as functions from 'firebase-functions';
import admin = require('firebase-admin');
import { Grupo, Rol } from '../../src/app/shared/models/local';
import { GruposService } from './grupos.service';
// import * as util from 'util';


const app = admin.initializeApp();
export const firestore = app.firestore();
firestore.settings({
  ignoreUndefinedProperties: true,
})
const grupoService = new GruposService

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const editarGrupo = functions.https.onCall(async (data, context) => {
  const grupo: Grupo = data.grupo
  const grupoId = data.id


  if (grupo !== undefined && grupoId !== undefined) {
    const grupos = await firestore.collection('usuarios_grupos').where("grupo_id", "==", grupoId).get();
    const batch = firestore.batch()

    await firestore.collection('grupos').doc(grupoId).update(grupo)

    grupos.forEach(grupoEditar => {
      console.log(`Voy a editar el usuario grupo ${grupoEditar}`);
      const grupoRef = firestore.collection("usuarios_grupos").doc(grupoEditar.id);
      batch.update(grupoRef, {
        nombre: grupo.nombre,
        descripcion: grupo.descripcion,
      });
    });

    await batch.commit()
    return 200

  } else {
    throw new functions.https.HttpsError('invalid-argument', 'La petición es incorrecta.');
  }

})

exports.agregarUsuarioAGrupo = functions.https.onCall(async (data) => {
  const codigoGrupo = data.codigoGrupo
  let grupoId: any
  let querySnapshotCodeExist: any
  let grupo: any
  const uid: string = data.uid

  return await firestore.collection('grupos').where("codigo_grupo", "==", codigoGrupo).get().then(async querySnapshot => {
    if (!querySnapshot.empty) {
      querySnapshot.forEach(doc => {
        grupo = doc.data()
        grupoId = doc.id
      });
      querySnapshotCodeExist = await firestore.collection('usuarios_grupos').where("grupo_id", "==", grupoId).where("usuario_id", "==", uid).get()

      if (querySnapshotCodeExist.empty) {
        console.log('El grupo existe y el usuario no tiene registrado ese grupo');
        const rol = Rol.estudiante
        const usuario_grupo = grupoService.crearUsuarioGrupo(uid, grupoId, rol, grupo.nombre, grupo.descripcion)
        await grupoService.enlazarUsuarioConGrupo(usuario_grupo)
        return { grupoId: grupoId }
      } else if (!querySnapshotCodeExist.empty) {
        throw new functions.https.HttpsError('already-exists', 'Ya estás en este grupo.');
      } else {
        throw new functions.https.HttpsError('unknown', 'Error Desconocido', 'Haces cosas raras Peter');
      }
    } else {
      throw new functions.https.HttpsError('not-found', 'No existe un grupo con el código ingresado.');
    }
  })
});

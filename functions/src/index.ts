import * as functions from 'firebase-functions';
import admin = require('firebase-admin');
// import * as util from 'util';
import { Grupo } from '../../src/app/shared/models/local';


const app = admin.initializeApp();
const firestore = app.firestore();

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
    // res.set('Access-Control-Allow-Origin', '*').status(200).send("Grupo Editado");
    return 200

  } else {
    // res.sendStatus(400);
    return
  }

})

// export const editarGrupo = functions.https.onRequest(async (req, res) => {
//   const grupo: Grupo = req.body.grupo
//   const grupoId = (req.query.id)?.toString()
//   const method = req.method

//   if (method === 'PUT') {
//     if (grupo != undefined && grupoId !== undefined) {
//       const grupos = await firestore.collection('usuarios_grupos').where("grupo_id", "==", grupoId).get();
//       const batch = firestore.batch()

//       await firestore.collection('grupos').doc(grupoId).update(grupo)

//       grupos.forEach(grupoEditar => {
//         console.log(`Voy a editar el usuario grupo ${grupoEditar}`);
//         const grupoRef = firestore.collection("usuarios_grupos").doc(grupoEditar.id);
//         batch.update(grupoRef, {
//           nombre: grupo.nombre,
//           descripcion: grupo.descripcion,
//         });
//       });

//       await batch.commit()
//       res.status(200).send("Grupo Editado");

//     } else {
//       res.sendStatus(400);
//     }

//   } else {
//     res.sendStatus(501);
//   }
// });

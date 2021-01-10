// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { API_KEY } from 'variables';

export const environment = {
  production: false,
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: "pitt-app.firebaseapp.com",
    databaseURL: "https://pitt-app.firebaseio.com",
    projectId: "pitt-app",
    storageBucket: "pitt-app.appspot.com",
    messagingSenderId: "272807089126",
    appId: "1:272807089126:web:68b7f4f549302f9d67bc27",
    measurementId: "G-FHQDGNFKW1"
  },

  urlDev: {
    editarGrupo: "http://localhost:5001/pitt-app/us-central1/editarGrupo"
  },

  useEmulators: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

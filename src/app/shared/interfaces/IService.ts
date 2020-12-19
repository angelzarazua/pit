import { AngularFirestoreCollection } from '@angular/fire/firestore';

export interface IService {
    pathCollection: AngularFirestoreCollection;
    
    crear(data: object): void;
    obtenerPorId(id: string): object;
    editar(data: object): void;
    eliminar(id: string): void;
}
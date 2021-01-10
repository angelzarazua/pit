export interface Usuario {
    uid: string,
    nombres: string,
    apellido_paterno: string,
    apellido_materno: string,
    numero_lista: number,
    email: string,
    photoURL: string,
    created_at: string,
    emailVerified: boolean,
    displayName: string,
}

export interface Grupo {
    nombre: string,
    codigo_grupo: string,
    descripcion: string,
    asignaturas: string[],
    created_at: Date,
    updated_at?: Date
}

export interface Usuario_Grupo {
    usuario_id: string,
    grupo_id: string,
    nombre: string,
    descripcion: string,
    roles: Rol[],
    created_at: Date,
    updated_at?: Date
}

export enum Rol {
    admin = "admin",
    estudiante = "estudiante"
}
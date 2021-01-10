import { Usuario_Grupo, Rol } from '../../src/app/shared/models/local';
import { firestore } from './index'


export class GruposService {
    async enlazarUsuarioConGrupo(usuarioGrupo: Usuario_Grupo) {
        try {
            await firestore.collection('usuarios_grupos').add(usuarioGrupo)
        } catch (error) {
            console.error("Error al enlazar Usuario con Grupo: ", error);
        }
    }

    crearUsuarioGrupo(usuarioId: string, grupoId: string, rol: Rol, nombre: string, descripcion: string): Usuario_Grupo {
        const usuarioGrupo: Usuario_Grupo = {
            usuario_id: usuarioId,
            grupo_id: grupoId,
            nombre: nombre,
            descripcion: descripcion,
            roles: [rol],
            created_at: new Date(),
            updated_at: undefined
        }
        return usuarioGrupo
    }
}
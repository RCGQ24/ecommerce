import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  usuarios: any[] = [];
  usuarioSeleccionado: any = null;

  constructor(public usuariosService: UsuariosService) {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuariosService.getUsers().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  obtenerUsuario(id: number) {
    this.usuariosService.getUser(id).subscribe(
      (data) => {
        this.usuarioSeleccionado = data;
      },
      (error) => {
        console.error('Error al obtener usuario:', error);
      }
    );
  }

  crearUsuario(usuario: any) {
    this.usuariosService.createUser(usuario).subscribe(
      (data) => {
        this.obtenerUsuarios(); // Actualiza la lista
      },
      (error) => {
        console.error('Error al crear usuario:', error);
      }
    );
  }

  actualizarUsuario(id: number, usuario: any) {
    this.usuariosService.updateUser(id, usuario).subscribe(
      (data) => {
        this.obtenerUsuarios(); // Actualiza la lista
      },
      (error) => {
        console.error('Error al actualizar usuario:', error);
      }
    );
  }

  eliminarUsuario(id: number) {
    this.usuariosService.deleteUser(id).subscribe(
      (data) => {
        this.obtenerUsuarios(); // Actualiza la lista
      },
      (error) => {
        console.error('Error al eliminar usuario:', error);
      }
    );
  }
}


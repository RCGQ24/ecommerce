import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-iniciarsesion-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './form-iniciarsesion-registro.component.html',
  styleUrls: ['./form-iniciarsesion-registro.component.scss']
})
export class FormIniciarsesionRegistroComponent implements OnInit {
  isLogin = true;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  imagePath = 'https://i.imgur.com/QIrZWGIs.jpg'; // Imagen por defecto online

  constructor(
  private fb: FormBuilder,
  private http: HttpClient,
  private router: Router
) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  switchTab(isLogin: boolean) {
    this.isLogin = isLogin;
  }

  onLogin() {
  const email = this.loginForm.value.email;
  const password = this.loginForm.value.password;

  if (email === 'admin@correo.com' && password === 'admin123') {
    const usuario = { email, rol: 'admin' };
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.router.navigateByUrl('/admin-menu');
  } else {
    // Buscar usuario en la base de datos
    this.http.get<any[]>('http://localhost:8000/api/usuarios').subscribe({
      next: usuarios => {
        const usuario = usuarios.find(
          (u: any) => u.email === email && u.contrasena === password
        );
        if (usuario) {
          localStorage.setItem('usuario', JSON.stringify(usuario));
          this.router.navigateByUrl('/');
        } else {
          alert('Credenciales incorrectas');
        }
      },
      error: err => alert('Error al buscar usuario: ' + (err.error?.msg || err.message))
    });
  }
}

  onRegister() {
    if (
      this.registerForm.valid &&
      this.registerForm.value.password === this.registerForm.value.confirmPassword
    ) {
      // 1. Obtener la cantidad de usuarios para asignar nombre_usuario
      this.http.get<any[]>('http://localhost:8000/api/usuarios').subscribe({
        next: usuarios => {
          const nombre_usuario = `Usuario${usuarios.length}`; // Empieza en Usuario2
          const nuevoUsuario = {
            nombre_usuario,
            email: this.registerForm.value.email,
            contrasena: this.registerForm.value.password,
            id_rol: 'Usuarios'
          };
          // 2. Registrar el usuario en la base de datos
          this.http.post('http://localhost:8000/api/usuarios', nuevoUsuario).subscribe({
            next: res => alert('¡Registro exitoso!'),
            error: err => alert('Error al registrarse: ' + (err.error?.msg || err.message))
          });
        },
        error: err => alert('Error al consultar usuarios: ' + (err.error?.msg || err.message))
      });
    } else {
      alert('Las contraseñas no coinciden');
    }
  }
}

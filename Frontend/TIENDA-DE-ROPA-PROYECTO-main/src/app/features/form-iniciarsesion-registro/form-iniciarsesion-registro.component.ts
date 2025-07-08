import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  returnUrl: string = '/';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    // Get return URL from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit() {
    // If user is already logged in, redirect to home
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/']);
      return;
    }

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

    this.http.post<any>('http://localhost:8000/api/usuarios/login', { email, contrasena: password }).subscribe({
      next: usuario => {
        // Redirigir según el rol
        let rol = usuario.id_rol || usuario.rol;
        if (rol === 'admin') {
          this.authService.login({ ...usuario, rol: 'admin' });
          this.router.navigateByUrl('/admin-menu');
        } else if (rol === 'supervisor') {
          this.authService.login({ ...usuario, rol: 'supervisor' });
          this.router.navigateByUrl('/supervisor');
        } else if (rol === 'empleado') {
          this.authService.login({ ...usuario, rol: 'empleado' });
          this.router.navigateByUrl('/empleado');
        } else {
          this.authService.login({ ...usuario, rol: 'user' });
          this.router.navigate([this.returnUrl]);
        }
      },
      error: err => {
        alert(err.error?.msg || 'Credenciales incorrectas');
      }
    });
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
            next: (res: any) => {
              alert('¡Registro exitoso!');
              this.authService.login({ ...res, rol: 'user' });
              this.router.navigate([this.returnUrl]);
            },
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

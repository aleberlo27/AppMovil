import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, last, map, Observable, of, tap, throwError } from 'rxjs';
import { WorkerResponse } from '../models/auth.interface';

//Creamos la constante base url para
const baseUrl = environment.baseUrl
type AuthStatus = 1 | 2; //1: autenticado 2: no autenticado

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  // BehaviorSubject para manejar el perfil del trabajador en memoria
  private _workerSubject = new BehaviorSubject<WorkerResponse | null>(null);
  public worker$ = this._workerSubject.asObservable();

  // Role basado en el perfil del trabajador
  private _role = new BehaviorSubject<AuthStatus>(2); // 2 = no autenticado, 1 = autenticado
  public role$ = this._role.asObservable();

  constructor() { }

  // Método para iniciar un turno
  startShift(workerId: string, shiftData: { date: string, start: string, end: string }): Observable<any> {
    return this.http.patch(`${baseUrl}/worker/${workerId}/schedules`, shiftData).pipe(
      tap((response) => {
        console.log('Turno registrado en el backend', response);
      }),
      catchError((error) => {
        console.error('Error al iniciar el turno:', error);
        return throwError(() => new Error('Error al iniciar el turno'));
      })
    );
  }

  // Método para obtener el perfil del trabajador por su ID
  getWorkerProfile(workerId: string): Observable<WorkerResponse | null> {
    return this.http.get<WorkerResponse>(`${baseUrl}/worker/${workerId}`).pipe(
      catchError((error: any) => {
        console.error('Error al obtener perfil:', error);
        return of(null);
      })
    );
  }

  // Método para el login básico (email y password)
  login(email: string, password: string): Observable<boolean> {
    return this.http.post<WorkerResponse>(`${baseUrl}/worker/login`, {
      email: email,
      password: password,
    }).pipe(
      tap(resp => {
        this._workerSubject.next(resp); // Guardamos el perfil del trabajador
        this._role.next(1); // Establecemos el rol como autenticado
      }),
      map(() => true),
      catchError((error: any) => {
        this._workerSubject.next(null); // Limpiamos el perfil en caso de error
        this._role.next(2); // Establecemos el rol como no autenticado
        return of(false);
      })
    );
  }

  // Método para el registro de un trabajador
  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    companyCode: string
  ): Observable<boolean> {
    return this.http.post<WorkerResponse>(`${baseUrl}/worker`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      companyCode: companyCode,
    }).pipe(
      tap(() => console.log("Usuario registrado")),
      map(() => true),
      catchError((error: any) => {
        console.error("Error en el registro", error);
        return of(false);
      })
    );
  }

  // Método para verificar si un código de empresa es válido
  checkCompanyCode(companyCode: string): Observable<boolean> {
    return this.http.get(`${baseUrl}/company/code/${companyCode}`).pipe(
      map(() => {
        console.log("Company code válido");
        return true; // Si se encuentra la empresa
      }),
      catchError((error) => {
        if (error.status === 404) {
          console.warn("Empresa no encontrada");
        } else {
          console.error("Error al verificar companyCode:", error);
        }
        return of(false); // Empresa no encontrada o error
      })
    );
  }

  // Método para cerrar sesión
  logout(): void {
    this._workerSubject.next(null); // Limpiamos el perfil
    this._role.next(2); // Establecemos el rol como no autenticado
  }
}

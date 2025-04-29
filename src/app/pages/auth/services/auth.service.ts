import { Worker } from './../models/auth.models';
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, last, map, Observable, of, tap } from 'rxjs';
import { WorkerResponse } from '../models/auth.interface';

//Creamos la constante base url para
const baseUrl = environment.baseUrl
type AuthStatus = 1 | 2; //1: autenticado 2: no autenticado

@Injectable({providedIn: 'root'})
export class AuthService {
  private http = inject(HttpClient);

  private _role = signal<AuthStatus>(2);
  private _worker = signal<WorkerResponse | null>(null);

  role = computed<AuthStatus>(() => {
    if(this._role() == 2) return 2;
    if(this._worker()) return 1;
    return 2;
  });

  worker = computed(() => this._worker());

  // Login básico (por email y password)
  login(email: string, password: string): Observable<boolean>{
    return this.http.post<WorkerResponse>(`${baseUrl}/worker/login`, {
      email: email,
      password: password,
    }).pipe(
      tap(resp => {
        this._worker.set(resp);
        this._role.set(1);
        localStorage.setItem('companyCode', resp.companyCode);
      }),
      map(() => true),
      catchError((error:any) => {
        this._worker.set(null);
        this._role.set(2);
        return of(false);
      })
    );
  }

  //register.service.ts o auth.service.ts
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
      role: '3', //asignar siempre el rol 3
    }).pipe(
      tap(() => console.log("Usuario registrado")),
      map(() => true),
      catchError((error:any) => {
        console.error("Error en el registro", error);
        return of(false);
      })
    );
  }


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
}

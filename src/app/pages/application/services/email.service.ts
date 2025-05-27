import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl

@Injectable({providedIn: 'root'})
export class EmailService {
  httpClient = inject(HttpClient);

  sendTurnoEmail(workerId: string){
    return this.httpClient.post(`${baseUrl}/send-turno-email`, {workerId});
  }

}

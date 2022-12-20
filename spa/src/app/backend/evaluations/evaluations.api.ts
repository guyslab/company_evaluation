import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Evaluation } from "../../model/evaluation/evaluation.model";

@Injectable({
  providedIn: 'root'
})
export class EvaluationsApi {

  constructor(private http: HttpClient) { }

  createEvaluation(userId: string, accessToken: string): Observable<any> {
    const headers = this.getHeaders(accessToken);
    const url = `${environment.evaluationApiBaseUrl}/users/${userId}/evaluations`;
    return this.http.post<any>(url, null, { headers });
  }

  getLatestEvaluation(userId: string, accessToken: string): Observable<Evaluation> {
    const headers = this.getHeaders(accessToken);
    const url = `${environment.evaluationApiBaseUrl}/users/${userId}/evaluations/latest`;
    return this.http.get<Evaluation>(url, { headers });
  }

  getHeaders(tokenHeaderValue: string): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-user-id', tokenHeaderValue);
  }
}

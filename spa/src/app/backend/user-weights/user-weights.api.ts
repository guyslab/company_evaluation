import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserWeights } from "../../model/user-weights/user-weights.model";

@Injectable({
  providedIn: 'root'
})
export class UserWeightsApi {

  constructor(private http: HttpClient) { }

  updateUserWeights(userId: string, weights: UserWeights, accessToken: string): Observable<any> {
    const headers = this.getHeaders(accessToken);
    const url = `${environment.scoringApiBaseUrl}/users/${userId}/weights`;
    return this.http.put<any>(url, weights, { headers });
  }

  getUserWeights(userId: string, accessToken: string): Observable<UserWeights> {
    const headers = this.getHeaders(accessToken);
    const url = `${environment.scoringApiBaseUrl}/users/${userId}/weights`;
    return this.http.get<UserWeights>(url, { headers });
  }

  getHeaders(tokenHeaderValue: string): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-user-id', tokenHeaderValue);
  }
}

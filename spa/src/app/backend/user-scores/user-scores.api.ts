import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CompanyScore } from "../../model/company-score/company-score.model";

@Injectable({
  providedIn: 'root'
})
export class UserScoresApi {

  constructor(private http: HttpClient) { }

  updateUserScores(userId: string, score: CompanyScore, accessToken: string): Observable<any> {
    const headers = this.getHeaders(accessToken);
    const url = `${environment.scoringApiBaseUrl}/users/${userId}/scores/${score.company_id}`;
    return this.http.put<any>(url, { score: score.score }, { headers });
  }

  getUserScores(userId: string, accessToken: string): Observable<CompanyScore[]> {
    const headers = this.getHeaders(accessToken);
    const url = `${environment.scoringApiBaseUrl}/users/${userId}/scores`;
    return this.http.get<CompanyScore[]>(url, { headers });
  }

  getHeaders(tokenHeaderValue: string): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-user-id', tokenHeaderValue);
  }
}

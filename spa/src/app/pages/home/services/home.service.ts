import { Injectable } from '@angular/core';
import { IdentityService } from "../../../shared/services/identity/identity.service";
import { EvaluationsApi } from "../../../backend/evaluations/evaluations.api";
import { UserScoresApi } from "../../../backend/user-scores/user-scores.api";
import { Observable, forkJoin, map, switchMap, delay, tap, BehaviorSubject, Subject } from 'rxjs';
import { EditableCompanyScore } from "../../../model/editable-company-score/editable-company-score.model";
import { CompanyScore } from 'src/app/model/company-score/company-score.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  activeUserId: string = '';
  evaluationInfo: Subject<EditableCompanyScore[]> = new Subject();
  evaluationInfo$ = this.evaluationInfo.asObservable();

  constructor(
    private identityService: IdentityService,
    private userScoresApi: UserScoresApi,
    private evaluationApi: EvaluationsApi) {
    identityService.activeId$.subscribe(val => this.activeUserId = val);
   }

  getEvaluationInfo(): Observable<EditableCompanyScore[]> {
    const userScoresRequest = this.userScoresApi.getUserScores(this.activeUserId, this.activeUserId);
    const latestEvaluationRequest = this.evaluationApi.getLatestEvaluation(this.activeUserId, this.activeUserId);

    return forkJoin([latestEvaluationRequest, userScoresRequest]
      ).pipe (
        map(([latestEvaluation, userScores]) => {
          const evalInfo: EditableCompanyScore[] = [];

          latestEvaluation.results.forEach(companyEvaluation => evalInfo.push({
            company_id: companyEvaluation.company_id,
            score: companyEvaluation.score,
            user_score: userScores.find(score => score.company_id === companyEvaluation.company_id)?.score
          }));
          
          return evalInfo;
        }),
        tap(evalInfo => this.evaluationInfo.next(evalInfo))
      )
  }

  setUserScore(companyScore: CompanyScore){
    return this.userScoresApi.updateUserScores(this.activeUserId, companyScore, this.activeUserId);
  }

  recalculate(){
    return this.evaluationApi.createEvaluation(this.activeUserId, this.activeUserId
      ).pipe(
        delay(2000),
        switchMap(() => this.getEvaluationInfo())
      );
  }
}

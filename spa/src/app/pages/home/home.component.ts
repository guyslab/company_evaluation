import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IdentityService } from '../../shared/services/identity/identity.service';
import { EditableCompanyScore } from '../../model/editable-company-score/editable-company-score.model';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  evaluationInfo$: Observable<EditableCompanyScore[]> = new Observable<EditableCompanyScore[]>();
  editingIndex: number;
  editedScores: (number | undefined)[];
  isRecalculatable: boolean;

  constructor(
    private service: HomeService,
    private identity: IdentityService) {
    identity.activeId$.subscribe(() => this.ngOnInit());
    this.isRecalculatable = false;
    this.editingIndex = -1;
    this.editedScores = [];
    this.evaluationInfo$ = service.evaluationInfo$.pipe(
      tap((info: EditableCompanyScore[]) => {
        this.editedScores = [...info.map(s => s.user_score)];
        this.isRecalculatable = true;
      })
    );
  }

  ngOnInit() {
    this.recalculate();
  }

  setUserScoreEdit(index: number){
    this.editingIndex = index;
  }

  updateUserScore(index: number, companyEvaluation: EditableCompanyScore, e: Event) {
    companyEvaluation.user_score = parseInt((e.target as HTMLInputElement)?.value);
    if (!companyEvaluation.user_score){
      return;
    }

    if (companyEvaluation.user_score == companyEvaluation.score) {
      return;
    }

    this.service.setUserScore({
      company_id: companyEvaluation.company_id,
      score: companyEvaluation.user_score
    }).subscribe(() => this.editedScores[index] = companyEvaluation.user_score);
  }

  recalculate() {
    this.isRecalculatable = false;
    this.service.recalculate().subscribe(() => {
      this.isRecalculatable = true;
    });
  }

}

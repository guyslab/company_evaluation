import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  activeId: BehaviorSubject<string> = new BehaviorSubject('SYSTEM_ADMIN');
  activeId$ = this.activeId.asObservable();
  isUserScoreWeightEditable$: Observable<boolean> = this.activeId$.pipe(map(active => active === 'SYSTEM_ADMIN'));

  constructor() { }

  signIn(activeId: string): void {
    this.activeId.next(activeId);
  }

}

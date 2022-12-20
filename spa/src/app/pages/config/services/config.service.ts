import { Injectable } from '@angular/core';
import { IdentityService } from "../../../shared/services/identity/identity.service";
import { UserWeightsApi } from "../../../backend/user-weights/user-weights.api";
import { Observable } from 'rxjs';
import { UserWeights } from '../../../model/user-weights/user-weights.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  activeUserId: string = '';

  constructor(
    private identityService: IdentityService,
    private api: UserWeightsApi
  ) { 
    identityService.activeId$.subscribe(val => this.activeUserId = val);
  }

  getUserWeights() : Observable<UserWeights>{
    return this.api.getUserWeights(this.activeUserId, this.activeUserId);
  }

  updateUserWeights(weights: UserWeights): Observable<any> {
    return this.api.updateUserWeights(this.activeUserId, weights, this.activeUserId);
  }
}

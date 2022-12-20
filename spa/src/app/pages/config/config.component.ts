import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../../shared/services/identity/identity.service';
import { UserWeights } from '../../model/user-weights/user-weights.model';
import { ConfigService } from "./services/config.service";
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  userWeights: UserWeights;
  isUserScoreWeightEditable: boolean = false;
  isSubmitable: boolean;

  constructor(
    private service: ConfigService,
    private identity: IdentityService
  ) {
    this.isSubmitable = false;
    identity.isUserScoreWeightEditable$.subscribe(val => this.isUserScoreWeightEditable = val);
    identity.activeId$.subscribe(() => this.ngOnInit());
    this.userWeights = this.getInitialUserWeights();
  }

  ngOnInit(): void {
    this.service.getUserWeights().subscribe(w => {
      console.debug('Got user weights:', w)
      this.userWeights = w;
      this.isSubmitable = true;
    });
  }

  submit(): void {
    this.isSubmitable = false;
    this.service.updateUserWeights(this.userWeights).subscribe({ 
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        this.ngOnInit();
      }
    });
  }

  getInitialUserWeights() : UserWeights {
    return {
      company_age: 0,
      company_funding: 0,
      company_size: 0,
      user_scoring: 0
    };
  }

}

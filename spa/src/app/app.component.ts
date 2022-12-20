import { Component } from '@angular/core';
import { IdentityService } from './shared/services/identity/identity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Company evaluation';
  activeUserId = '';

  constructor(
    private identityService: IdentityService) {
  }

  userChanged(e: Event){
    const value = (e.target as HTMLSelectElement).value;
    this.identityService.signIn(value);
  }
}

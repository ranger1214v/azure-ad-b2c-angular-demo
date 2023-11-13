import {Component} from '@angular/core';
import {AzureService} from "./azure/azure.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(
    public azureService: AzureService,
  ) {

    this.azureService
      .authStatus$
      .subscribe(() => {
        console.log('this.authService.instance.getAllAccounts()', this.azureService.authService.instance.getAllAccounts())
      });
  }

  async _btnLogIn() {
    await this.azureService.logIn();
  }

  async _btnLogOut() {
    await this.azureService.logOut();
  }

}

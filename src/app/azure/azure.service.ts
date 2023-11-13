import {Inject, Injectable} from '@angular/core';
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from "@azure/msal-angular";
import {
  AuthenticationResult,
  InteractionStatus,
  InteractionType,
  PopupRequest,
  RedirectRequest
} from "@azure/msal-browser";
import {filter, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AzureService {

  public authStatus$ = this.msalBroadcastService.inProgress$.pipe(
    filter((status: InteractionStatus) => status === InteractionStatus.None),
  );

  public isLogin$ = this.authStatus$.pipe(
    map(() => this.authService.instance.getAllAccounts().length > 0),
  );

  public isIframe = false;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    public authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {
    this.isIframe = window !== window.parent && !window.opener;
  }

  async logIn() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      } else {
        this.authService.loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
      } else {
        this.authService.loginRedirect();
      }
    }
  }

  async logOut() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.authService.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/"
      });
    } else {
      this.authService.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  }

}

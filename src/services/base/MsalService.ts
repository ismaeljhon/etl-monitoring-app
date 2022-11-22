import * as Msal from "@azure/msal-browser";
import LocalStorageService from "../LocalStorageService";

export default class MsalService {
  private localStorage: InstanceType<typeof LocalStorageService>;
  private msalConfig = {
    auth: {
      clientId: import.meta.env.VITE_AAD_CLIENT_ID,
      authority: import.meta.env.VITE_AAD_CLOUD_INSTANCE,
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: true,
    },
  };
  private msalObject = new Msal.PublicClientApplication(this.msalConfig);
  private userName: string | undefined;

  constructor() {}

  handleResponse(response) {
    console.log(response);
  }

  async signIn() {
    const requestObject = {
      scopes: ["User.Read"],
    };
    const activeAccount = this.msalObject.getActiveAccount();
    if (!activeAccount) {
      const resp = await this.msalObject.loginPopup(requestObject);
      this.msalObject.setActiveAccount(resp.account);
      return resp.account;
    } else {
      return activeAccount;
    }
  }

  async getActiveAccount() {
    return await this.msalObject.getActiveAccount();
  }

  async signOut() {
    const logoutRequest = {
      account: await this.msalObject.getActiveAccount(),
    };
    this.msalObject.logoutPopup(logoutRequest);
  }
}

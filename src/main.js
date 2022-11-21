import { createApp } from "vue";
import App from "./App.vue";
import { Quasar, Notify } from "quasar";
import { router } from "./router";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";

import * as Msal from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "51e5687a-2775-40a0-8e73-4fc069de01a2",
    authority:
      "https://login.microsoftonline.com/929ae199-3940-4e79-be0a-5d4ded31e040",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};
const myMsalObject = new Msal.PublicClientApplication(msalConfig);

// mount the application
const loadApp = () => {
  const app = createApp(App);

  app.use(router);
  app.use(Quasar, {
    plugins: { Notify },
  });

  app.mount("#app");

}

if (myMsalObject.getActiveAccount()) {
  loadApp()
} else {
  const requestObject = {
    scopes: ["User.Read"],
  }
  myMsalObject.loginPopup(requestObject).then(user => {
    loadApp()
  })
}
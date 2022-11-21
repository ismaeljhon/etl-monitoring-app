import { createApp } from "vue";
import App from "./App.vue";
import { Quasar, Notify } from "quasar";
import { router } from "./router";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";

import * as Msal from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "64705373-1068-4aa3-924e-4fe5f21d79f3",
    authority:
      "https://login.microsoftonline.com/6678bda1-2c7a-4f50-a21c-6a70d66e6399/",
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
import { createApp } from "vue";
import App from "./App.vue";
import { Quasar, Notify } from "quasar";
import { router } from "./router";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";

// mount the application
const app = createApp(App);

app.use(router);
app.use(Quasar, {
  plugins: { Notify },
});

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
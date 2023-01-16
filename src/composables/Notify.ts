import { Notify } from "quasar";
import { router } from "../../src/router";

function pushUrl (companyCode, dir) {
  router.push(`/companies/${companyCode}/webjobs/etl/${dir}`);
}

export function showNotif (companyCode, msg) {
  if (msg.value.success) {
    Notify.create({
      progress: true,
      message: `${msg.value?.msg}. Webjob: ${msg.value?.dir}`,
      type: msg.value?.success ? "positive" : "negative",
      multiLine: true,
      actions: [
        {
          label: "Check WebJob",
          color: "white",
          handler: () => {
            pushUrl(companyCode, msg.value?.dir);
          },
        },
        {
          label: "Dismiss",
          color: "white",
          handler: () => { },
        },
      ],
    });
  } else {
    Notify.create({
      progress: true,
      message: `Request was not accepted, please contact FE Team.`,
      type: "negative",
      actions: [
        {
          label: "Close",
          color: "white",
          handler: () => { },
        },
      ],
    });
  }
}

export function showSimpleNotification (msg) {
  Notify.create({
    message: `${msg}`,
    position: "top",
    type: "positive",
  });
}

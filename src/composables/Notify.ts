import { Notify } from "quasar";
import { useRouter } from "vue-router";

const router = useRouter();

export function showNotif(companyCode, msg) {
  if (msg.value) {
    setTimeout(() => {
      Notify.create(
        {
          progress: true,
          message: `${msg.value?.msg}. Webjob: ${msg.value?.dir}`,
          type: msg.value?.success ? "positive" : "negative",
          multiLine: true,
          actions: [
            {
              label: "Check WebJob",
              color: "white",
              handler: () => {
                router.push(
                  `/companies/${companyCode.value}/webjobs/etl/${msg.value?.dir}`
                );
              },
            },
            {
              label: "Dismiss",
              color: "white",
              handler: () => {},
            },
          ],
        }
      );
    }, 2000);
  } else {
    Notify.create({
      progress: true,
      message: `Request was not accepted, please contact FE Team.`,
      type: "negative",
      actions: [
        {
          label: "Close",
          color: "white",
          handler: () => {},
        },
      ],
    });
  }
}

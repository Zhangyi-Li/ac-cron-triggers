/** @format */

interface Env {}
export default {
  async scheduled(
    controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext
  ) {
    // Write code for updating your API
    switch (controller.cron) {
      case "*/5 * * * *":
        // Every five minutes

        console.log("cron started");
        const updateAPI = async () => {
          try {
            const response = await fetch(
              "https://user.acceclaim.com/api/mail/sendDailyReviewMail",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  to: "liz.zhangyi638@gmail.com",
                }),
              }
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("API updated successfully:", data);
          } catch (error) {
            console.error("Error updating API:", error);
          }
        };

        await updateAPI();
        break;
      // case "*/10 * * * *":
      // 	// Every ten minutes
      // 	await updateAPI2();
      // 	break;
      // case "*/45 * * * *":
      // 	// Every forty-five minutes
      // 	await updateAPI3();
      // 	break;
    }
    console.log("cron processed");
  },

  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return new Response("Hello from fetch handler!", { status: 200 });
  },
};

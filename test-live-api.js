const autocannon = require("autocannon");

async function runLiveApiTest() {
  const url =
    "https://inetzinternshipwebsite.vercel.app/api/students?search=&page=1&limit=15&domain=Web+Development&fromDate=2026-08-01&toDate=2026-08-31";

  console.log(`🚀 Starting Load Test on Live Vercel Endpoint:\n${url}\n`);

  const instance = autocannon({
    url,
    method: "GET",
    connections: 30,
    duration: 10,
    headers: {
      // 🎯 UNCOMMENT AND PASTE YOUR COPIED SESSION TOKEN HERE:
      "cookie": "__Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..04SASi8XBvdnzum-.gDeWItEKXQ39FWYMWmWiK7l2Vahv7AvMo3ZvAx2DybqMrdzWoKzgJFsbbdQBzp28FTVx5JDjIdqovK5RqIeNnjmheIW2qu71JMvNKAYH0iRJQv_nHSsORdlHHihtHoPN1YiutkeXLlfnrkO8yTUAmIyXy54ycPUeqnV3rDqfOKOCMk_Fqi_jBpzQ2ax-TAKmCW3owRotDBWfmI_Tt7fqXmqusGVQFIfWVigHK-6dvBvJB0UWZ1onrFX88OLDQMdqGywBrfCa9quaEek3gvbis0ruSWXCICA3.SUg3AA0xu5HcsNLJmDVJAQ"
    },
  });

  autocannon.track(instance, { renderProgressBar: true });

  const result = await instance;

  console.log("\n✅ Live API Load Test Completed!");
  console.log(`Total Requests: ${result.requests.total}`);
  console.log(`Requests/sec: ${result.requests.average}`);
  console.log(`Average Latency: ${result.latency.average} ms`);
  console.log(`P99 Latency: ${result.latency.p99} ms`);
  console.log(`2xx Responses: ${result["2xx"]}`);
  console.log(`Non-2xx / Errors: ${result.non2xx}`);
}

runLiveApiTest();
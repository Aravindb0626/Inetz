const autocannon = require("autocannon");

function runWriteStressTest() {
  console.log("🔥 Starting Dynamic POST Write-Operation Stress Test...\n");

  const instance = autocannon({
    url: "http://127.0.0.1:3000/api/students", // 👈 Targets internal DB write route directly
    method: "POST",
    connections: 30,
    duration: 10,
    headers: {
      "content-type": "application/json",
      "cookie": "next-auth.session-token=YOUR_VALID_ADMIN_COOKIE_HERE" // Paste active session cookie
    },
    requests: [
      {
        method: "POST",
        path: "/api/students",
        headers: {
          "content-type": "application/json"
        },
        setupRequest: (req) => {
          const uniqueId = Math.floor(100000000 + Math.random() * 900000000);
          req.body = JSON.stringify({
            name: `Candidate ${uniqueId}`,
            email: `student_${uniqueId}@example.com`,
            phone: `98${uniqueId.toString().slice(0, 8)}`,
            college: "Test University",
            domain: "Web Development",
            duration: "1 Month",
            totalBilling: 5000,
            initialPayment: 1000,
            paymentMethod: "Cash",
            billingBy: "Load Test Engine"
          });
          return req;
        }
      }
    ]
  });

  autocannon.track(instance, { renderProgressBar: true });

  instance.on("done", (result) => {
    console.log("\n✅ Write Stress Test Finished!");
    console.log(`Successful 2xx Responses: ${result["2xx"]}`);
    console.log(`Failed / Non-2xx Responses: ${result.non2xx}`);
    console.log(`Requests/sec: ${result.requests.average}`);
    console.log(`Average Latency: ${result.latency.average} ms`);
  });
}

runWriteStressTest();
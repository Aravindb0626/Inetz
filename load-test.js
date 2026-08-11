const autocannon = require('autocannon');

async function runBenchmark() {
  console.log('🚀 Starting Autocannon Load Test on Next.js API...\n');

  const instance = autocannon({
    url: 'http://localhost:3000/api/students',
    connections: 50, // Concurrent sockets
    duration: 10,    // Duration in seconds
    headers: {
      'content-type': 'application/json',
    },
  });

  // Track real-time progress
  autocannon.track(instance, { renderProgressBar: true });

  const result = await instance;
  console.log('\n✅ Load Test Completed!');
  console.log(`Average Latency: ${result.latency.average} ms`);
  console.log(`Requests/sec: ${result.requests.average}`);
  console.log(`Total 2xx Success Responses: ${result['2xx']}`);
  console.log(`Total Non-2xx Errors: ${result.non2xx}`);
}

runBenchmark();
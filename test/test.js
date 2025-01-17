const autocannon = require('autocannon');

const run = () => {
  const url = 'http://localhost:3000/api/employee';
  const duration = 30; 
  const totalRequests = 100;
  for (let i = 0; i < totalRequests; i++) {
    const instance = autocannon(
      {
        url,
        method: 'POST',
        duration,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `Jane Doe ${i}`,
          email: `janedoe${Date.now()}-${i}@example.com`,
          mobile: Math.floor(1000000000 + Math.random() * 9000000000),
        }),
      },
      (err, res) => {
        if (err) {
          console.error('Error:', err);
        } else {
          console.log('Test Results:', res);
        }
      }
    );

    autocannon.track(instance);
  }
};

run();

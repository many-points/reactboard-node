const { spawn } = require('child_process');
const request = require('request');
const test = require('tape');

const env = Object.assign({}, process.env, {PORT: 3001});
const child = spawn('node', ['server.js'], { env });

test('Responds to requests', t => {
  t.plan(4);

  child.stdout.on('data', () => {
    request('http://localhost:3001/api/threads/0', (err, res, req) => {
      child.kill();
      t.false(err);
      t.equal(res.statusCode, 200);
    });
  });
});
const fs = require('fs');
const logFilePath = './log/logs.txt';

function handleLogsRequest(res, startTime, endTime) {
  startTime = new Date(startTime);
  endTime = new Date(endTime);

  const readStream = fs.createReadStream(logFilePath);

  readStream.on('data', (chunk) => {
    const logLines = chunk.toString().split('\n');
    for (const line of logLines) {
      const logTimestamp = new Date(line.split(' ')[0]);
      if (logTimestamp >= startTime && logTimestamp <= endTime) {
        res.write(line + '\n');
      }
    }
  });

  readStream.on('end', () => {
    res.end();
  });

  readStream.on('error', (err) => {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  });
}

module.exports = {
  handleLogsRequest,
};

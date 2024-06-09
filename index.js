const { Service } = require('node-windows');
const path = require('node:path');

// Name of the script file
const scriptName = 'autoTimeUpdater.js';
// Run mode
const runMode = process.argv[2];

const svc = new Service({
  name: 'Auto Time Update',
  description: 'Fetch and update time automatically',
  script: path.join(__dirname, scriptName),
  nodeOptions: ['--harmony', '--max_old_space_size=4096'],
  //, workingDirectory: '...'
  //, allowServiceLogon: true
});

svc.on('install', function () {
  svc.start();
});

svc.on('uninstall', function () {
  console.log('Uninstalled Auto time update service...');
  console.log(`Service exists: ${svc.exists}`);
});

if (runMode === 'install') {
  svc.install();
} else if (runMode === 'uninstall') {
  svc.uninstall();
}

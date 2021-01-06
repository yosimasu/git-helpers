#!/usr/bin/env node

const shell = require('shelljs');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

if (!shell.which('git')) {
  shell.echo('No git command found')
  shell.exit(1);
}

const argv = yargs(hideBin(process.argv))
.usage("$0 TICKET_NO [BRANCH]")
  .demandCommand(1, 'Please give the TICKET_NO parameter.')
  .help()
  .argv

const ticket = `${argv._[0]}`.toUpperCase();

const CMD_GET_LOCAL_USERNAME = 'git config --local user.name';
let username = shell.exec(CMD_GET_LOCAL_USERNAME, { silent: true }).stdout.trim();
if (username.length === 0) {
  shell.echo('Please run\n  git config --local user.name <USERNAME> to setup username.\n  git config --local user.email <EMAIL> to setup email.')
  shell.exit(2);
}
username = `_${username.toUpperCase().replace(' ', '_')}_`;

const CMD_GET_CURRENT_BRANCH = 'git rev-parse --abbrev-ref HEAD';
let branchname = argv._[1];
if (!branchname) {
  branchname = shell.exec(CMD_GET_CURRENT_BRANCH, { silent: true }).stdout.trim();
}

const CMD_CREATE_WORKING_BRANCH = `git checkout -b ${username}/${branchname}/${ticket} ${branchname}`;
shell.exec(CMD_CREATE_WORKING_BRANCH, { silent: true });

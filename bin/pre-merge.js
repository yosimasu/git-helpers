#!/usr/bin/env node

const shell = require('shelljs');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

if (!shell.which('git')) {
  shell.echo('No git command found')
  shell.exit(1);
}

const argv = yargs(hideBin(process.argv))
.usage("$0 CHILD_BRANCH PARENT_BRANCH")
  .demandCommand(2, 'Please give the CHILD_BRANCH and PARENT_BRANCH parameters.')
  .help()
  .argv

const child = argv._[0];
const parent = argv._[1];
const preMerged = `pre-merged/${child}`;
  
const CMD_CREATE_PRE_MERGED_BRANCH = `git checkout -b ${preMerged} ${parent}`;
shell.exec(CMD_CREATE_PRE_MERGED_BRANCH, { silent: true });
  
const CMD_MERGE = `git merge --no-ff --no-commit ${child} -m "Merge branch '${child}' into ${parent}"`;
shell.exec(CMD_MERGE, { silent: true });

#!/usr/bin/env node

const program = require('commander')

program
  .version('1.0.17')
  .command('run', 'Run a command')
  .command('tasks', 'Get running tasks')
  .command('kill', 'Kill a running task')
  .command('help', 'Display help', { isDefault: true })
  .parse(process.argv)

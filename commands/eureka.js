#!/usr/bin/env node

const program = require('commander')

program
  .version('1.0.8')
  .command('machines', 'Get all machines')
  .command('run', 'Run a command')
  .command('tasks', 'Get running tasks')
  .command('kill', 'Kill a running task')
  .parse(process.argv)

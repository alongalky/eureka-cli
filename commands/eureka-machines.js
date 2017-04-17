const config = require('../eureka.config')
const axiosAuth = require('./auth/axios-authenticated')(config)
const Table = require('cli-table')
const machines = require('./machines/machines')({
  get: axiosAuth.get,
  config
})

machines.getMachines()
  .then(response => {
    const table = new Table({
      head: ['Machine Name']
    })

    for (const machine of response) {
      table.push([machine.name || ''])
    }

    console.log(table.toString())
  }).catch(err => {
    console.error(err)
  })

const sinon = require('sinon')
const tasks = require('../../commands/tasks/tasks')
const assert = require('chai').assert
const config = {
  endpoint: 'http://fake.com',
  key: 'Key',
  secret: 'secret',
  account: 'fake-account'
}

describe('tasks', () => {
  describe('getTasks', () => {
    const get = sinon.stub()
    const getTasks = tasks({get, config}).getTasks

    beforeEach(() => {
      get.reset()
      get.returns(Promise.resolve({}))
    })

    it('returns the response body', done => {
      const expectedResponse = {that: 'works'}
      get.returns(Promise.resolve({data: expectedResponse}))

      getTasks()
        .then(response => {
          assert(get.calledOnce)
          assert.equal(response, expectedResponse)

          done()
        }).catch(err => done(err))
    })
    it('calls the correct url', done => {
      const expectedUrl = 'http://fake.com/api/accounts/fake-account/tasks'
      getTasks()
        .then(response => {
          sinon.assert.calledWith(get, expectedUrl)
          done()
        }).catch(err => done(err))
    })
  })
  describe('runTask', () => {
    const post = sinon.stub()
    const runTask = tasks({post, config}).runTask

    const args = ({
      machine: 'machina',
      command: [],
      output: ''
    })

    beforeEach(() => {
      post.reset()
      post.returns(Promise.resolve({}))
    })

    it('calls the correct url', done => {
      const expectedUrl = 'http://fake.com/api/accounts/fake-account/tasks'
      runTask(args)
        .then(response => {
          sinon.assert.calledWith(post, expectedUrl)
          done()
        }).catch(err => done(err))
    })
  })
  describe('killTask', () => {
    const put = sinon.stub()
    const killTask = tasks({put, config}).killTask

    const taskName = 'silly-name'

    beforeEach(() => {
      put.reset()
      put.returns(Promise.resolve({}))
    })

    it('calls the correct url and JSON', done => {
      const expectedUrl = 'http://fake.com/api/accounts/fake-account/tasks'
      killTask(taskName)
        .then(response => {
          sinon.assert.calledWith(put, expectedUrl, { task_name: 'silly-name' })
          done()
        }).catch(err => done(err))
    })
  })
})

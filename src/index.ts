//import * as core from '@actions/core'
import * as github from '@actions/github'
//import * as io from '@actions/io'

import * as issues from './issues'
import * as contributors from './contributors'

const run = async (): Promise<void> => {
  console.log(`Triggered due to: ${github.context.eventName}`)

  console.dir(github.context)

  await contributors.addContributor({}, ['code'])

  switch (github.context.eventName) {
    case 'issues':
      issues.processIssue(github.context.payload)
    default:
  }
}

run()

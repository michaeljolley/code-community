//import * as core from '@actions/core'
import * as github from '@actions/github'
//import * as io from '@actions/io'

import * as issues from './issues'

const run = async (): Promise<void> => {
  console.log(`Triggered due to: ${github.context.eventName}`)

  switch (github.context.eventName) {
    case 'issue':
      issues.processIssue(github.context)
    default:
  }
}

run()

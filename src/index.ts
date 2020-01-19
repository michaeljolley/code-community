import * as core from '@actions/core'
import * as github from '@actions/github'
//import * as io from '@actions/io'

import * as issues from './issues'

const run = async (): Promise<void> => {
  switch (github.context.eventName) {
    case 'issues':
      issues.processIssue(github.context.payload)
      break
    case 'pull-requests':
      // pullrequest.processPullRequest(github.context.payload);
      break
    default:
      break
  }
}

run()

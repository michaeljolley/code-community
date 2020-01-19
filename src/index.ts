import * as core from '@actions/core'
import * as github from '@actions/github'
//import * as io from '@actions/io'

import * as issues from './issues'
import * as contributors from './contributors'
import {CONNREFUSED} from 'dns'

const run = async (): Promise<void> => {
  await contributors.addContributor({}, ['code'])

  switch (github.context.eventName) {
    case 'issues':
      issues.processIssue(github.context.payload)
    default:
  }
}

run()

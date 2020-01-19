import * as core from '@actions/core'
import * as github from '@actions/github'
//import * as io from '@actions/io'

import * as issues from './issues'
import * as contributors from './contributors'

var path = require('path')
var fs = require('fs')

const run = async (): Promise<void> => {
  await contributors.addContributor({}, ['code'])

  fs.readdir(__dirname, function(err: any, files: any) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err)
    }
    //listing all files using forEach
    files.forEach(function(file: any) {
      // Do whatever you want to do with the file
      console.log(file)
    })
  })

  // switch (github.context.eventName) {
  //   case 'issues':
  //     issues.processIssue(github.context.payload);
  //     break;
  //   default:
  //     break;
  //}
}

run()

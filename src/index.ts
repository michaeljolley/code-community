//import * as core from '@actions/core'
import * as github from '@actions/github'
//import * as io from '@actions/io'

const run = async (): Promise<void> => {
  console.log(github.context.eventName)
}

run()

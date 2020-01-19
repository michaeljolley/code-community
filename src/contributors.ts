import * as io from '@actions/io'
import * as glob from '@actions/glob'

import {IUser} from './interfaces/IUser'

export const addContributor = async (user: IUser, contributions: [string]) => {
  // Ensure that the repo has its .code-communityrc file initialized
  await initializeRepo()
}

const initializeRepo = async () => {
  const globber = await glob.create('.code-communityrc')
  const files = await globber.glob()

  if (files.length > 0) {
    console.dir(files[0])
  } else {
    console.log('not found')
  }
}

import * as core from '@actions/core'
import * as github from '@actions/github'
import * as Octokit from '@octokit/rest'

import {IUser} from './interfaces/IUser'

const githubToken = core.getInput('githubToken')
const owner = github.context.repo.owner
const repo = github.context.repo.repo

const octokit = new github.GitHub(githubToken)

export const addContributor = async (user: IUser, contributions: [string]) => {
  // Ensure that the repo has its .code-communityrc file initialized
  await initializeRepo()
}

const initializeRepo = async () => {
  // Check if the .code-communityrc file exists. If not,
  // create it.

  try {
    const rcFile = await getFile('.code-communityrc')
  } catch (error) {
    console.log(JSON.stringify(error))
    // const initResult = await createOrUpdateFile(
    //     '.code-communityrc',
    //     '{}',
    //     'Adding .code-communityrc'
    //   )
    //   if (initResult.status !== 200) {
    //     console.error(
    //       `Error initializing repo: ${initResult.status} \n${JSON.stringify(
    //         initResult.headers
    //       )}`
    //     )
    //   }
  }
}

const getFile = async (
  path: string
): Promise<Octokit.Response<Octokit.ReposGetContentsResponse>> => {
  return await octokit.repos.getContents({
    owner,
    repo,
    path
  })
}

const createOrUpdateFile = async (
  path: string,
  content: string,
  message: string
): Promise<Octokit.Response<Octokit.ReposCreateOrUpdateFileResponse>> => {
  return await octokit.repos.createOrUpdateFile({
    owner,
    repo,
    path,
    message,
    content
  })
}

import * as core from '@actions/core'
import * as github from '@actions/github'
import * as Octokit from '@octokit/rest'
import btoa from 'btoa-lite'

import {IContributor} from './interfaces/IContributor'

const githubToken: string = core.getInput('githubToken')
const owner: string = github.context.repo.owner
const repo: string = github.context.repo.repo

const octokit: github.GitHub = new github.GitHub(githubToken)

let rcFile: string | undefined

export const addContributor = async (
  user: IContributor,
  contributions: [string]
) => {
  // Ensure that the repo has its .code-communityrc file initialized
  await initializeRepo()
}

const initializeRepo = async () => {
  // Check if the .code-communityrc file exists. If not,
  // create it.

  try {
    const getRCFileResult = await getFile('.code-communityrc')

    rcFile = getRCFileResult.data
  } catch (error) {
    const initResult = await createOrUpdateFile(
      '.code-communityrc',
      '{}',
      'Adding .code-communityrc'
    )
    if (initResult.status !== 201) {
      console.error(
        `Error initializing repo: ${initResult.status} \n${JSON.stringify(
          initResult.headers
        )}`
      )
    }
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
    content: btoa(content)
  })
}

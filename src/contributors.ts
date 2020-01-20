import * as core from '@actions/core'
import * as github from '@actions/github'
import * as Octokit from '@octokit/rest'
import btoa from 'btoa-lite'

import {IContributor} from './interfaces/IContributor'
import { IGitHubGetContentResponse } from './interfaces/IGitHubGetContentResponse'
import { IContributorRC } from './interfaces/IContributorRC'

const githubToken: string = core.getInput('githubToken')
const owner: string = github.context.repo.owner
const repo: string = github.context.repo.repo

const octokit: github.GitHub = new github.GitHub(githubToken)

let contribRC: IContributorRC

export const addContributor = async (
  contributor: IContributor
) => {
  // Ensure that the repo has its .code-communityrc file initialized
  await initializeRC()

  const newContrib: IContributorRC = {
    contributors: [contributor]
  }
  
  console.log(JSON.stringify(contribRC))

  contribRC = {...contribRC, ...newContrib}

  console.log(JSON.stringify(contribRC))
  
}

const initializeRC = async () => {
  try {
    const getRCFileResult = await getFile('.code-communityrc')
    contribRC = JSON.parse(atob((getRCFileResult.data as IGitHubGetContentResponse).content))
  } catch (error) { // If we've got an error there is no .code-communityrc file
    contribRC = {
      contributors: [ {
        'avatar_url': 'string',
        profile: 'string',
        login: 'MichaelJolley',
        name: 'string',
        contributions: [
          'bug'
        ]
      }]
    }
  }
}

  // const initResult = await createOrUpdateFile(
    //   '.code-communityrc',
    //   '{}',
    //   'Adding .code-communityrc'
    // )
    // if (initResult.status !== 201) {
    //   console.error(
    //     `Error initializing repo: ${initResult.status} \n${JSON.stringify(
    //       initResult.headers
    //     )}`
    //   )
    // }



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

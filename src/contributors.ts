import * as core from '@actions/core'
import * as github from '@actions/github'
import * as Octokit from '@octokit/rest'
import btoa from 'btoa-lite'

import {IContributor} from './interfaces/IContributor'
import {IGitHubGetContentResponse} from './interfaces/IGitHubGetContentResponse'
import {defaultRC, IContributorRC} from './interfaces/IContributorRC'

const githubToken: string = core.getInput('githubToken')
const owner: string = github.context.repo.owner
const repo: string = github.context.repo.repo

// github.GitHub.plugin(require('octokit-commit-multiple-files'))
const octokit: github.GitHub = new github.GitHub(githubToken)

let contribRC: IContributorRC = defaultRC
let contributor: IContributor

export const addContributor = async (contributorToAdd: IContributor) => {
  contributor = contributorToAdd

  // Ensure that the repo has its .code-communityrc file initialized
  await initializeRC()

  const shouldProceed = updateRC()

  // TODO: Update README.md with contributions
  // TODO: Below method only saves the .code-communityrc file. Need
  // to commit all changes. (See https://github.com/mheap/octokit-commit-multiple-files)

  if (shouldProceed) {
    await commitContribution()
  }
}

/**
 * Loads an existing .code-communityrc from the repo or
 * creates the contents for a new one.
 */
const initializeRC = async () => {
  try {
    const getRCFileResult = await getFile('.code-communityrc')
    contribRC = JSON.parse(
      atob((getRCFileResult.data as IGitHubGetContentResponse).content)
    )
  } catch (error) {
    // If we've got an error there is no .code-communityrc file
  }
}

/**
 * Updates the contribRC with the new contributor by adding them
 * or updating the contributions of an existing record. Returns true
 * if an update needs to be made to the repo; false if not.
 * @param contributor Contributor to ensure is in the contribRC
 */
const updateRC = (): boolean => {
  let existingContributor = contribRC.contributors.find(
    f => f.login == contributor.login
  )

  // if the contributor exists, see if they have any new
  // contribution types.  If so, merge and update.
  if (existingContributor) {
    const newContributions = existingContributor.contributions.filter(f => {
      return contributor.contributions.indexOf(f) < 0
    })

    // If there were no new contributions, we're done so return false.
    if (newContributions.length === 0) {
      return false
    }

    let filteredContributors = contribRC.contributors.filter(
      f => f.login != contributor.login
    )

    contributor.contributions = [
      ...existingContributor.contributions,
      ...contributor.contributions
    ]
    filteredContributors.push(contributor)
    contribRC.contributors = filteredContributors
  } else {
    contribRC.contributors.push(contributor)
  }
  return true
}

/**
 * Commits all changes to repo
 */
const commitContribution = async () => {
  const initResult = await createOrUpdateFile(
    '.code-communityrc',
    JSON.stringify(contribRC),
    `Adding contributions for ${contributor.login}`,
    'master' // TODO: Should not be committed to master branch
  )
  if (initResult.status !== 201) {
    console.error(
      `Error initializing repo: ${initResult.status} \n${JSON.stringify(
        initResult.headers
      )}`
    )
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
  message: string,
  branch: string
): Promise<Octokit.Response<Octokit.ReposCreateOrUpdateFileResponse>> => {
  return await octokit.repos.createOrUpdateFile({
    owner,
    repo,
    path,
    branch,
    message,
    content: btoa(content)
  })
}

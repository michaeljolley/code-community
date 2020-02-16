import * as core from '@actions/core'
import {WebhookPayload} from '@actions/github/lib/interfaces'

const actions: string[] = ['opened', 'updated']

export const processPullRequest = async (payload: WebhookPayload) => {
  if (!payload.pull_request) {
    core.setFailed('Pull Request was not provided.')
  }

  if (actions.find(f => f === payload.action)) {
    core.info(
      `Processing workflow for pull request: ${payload.pull_request?.number}`
    )

    // const labels = payload.issue?.labels as ILabel[]
    // const user = payload.issue?.user as IUser

    // let contributor: IContributor = {
    //   avatar_url: user.avatar_url || '',
    //   login: user.login || '',
    //   profile: user.html_url || `https://github.com/${user.login}`,
    //   contributions: labels.map(m => m.name)
    // }

    // await contributors.addContributor(contributor)
  }
}

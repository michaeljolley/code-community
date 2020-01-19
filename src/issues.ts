import {WebhookPayload} from '@actions/github/lib/interfaces'
import {IUser} from './interfaces/IUser'

import * as contributors from './contributors'
import {ILabel} from './interfaces/ILabel'
import {IContributor} from './interfaces/IContributor'

const actions: string[] = ['opened', 'labeled']

export const processIssue = async (payload: WebhookPayload) => {
  if (!payload.issue) {
    console.error('Issue was not provided.')
    return
  }

  if (actions.find(f => f === payload.action)) {
    const labels = payload.issue['labels'] as ILabel[]
    const user = payload.issue['user'] as IUser

    let contributor: IContributor = {
      avatar_url: user.avatar_url || '',
      login: user.login || '',
      profile: user.html_url || `https://github.com/${user.login}`,
      name: '',
      contributions: labels.map(m => m.name)
    }

    await contributors.addContributor(contributor, ['bug'])
  }
}

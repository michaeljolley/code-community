import {WebhookPayload} from '@actions/github/lib/interfaces'
import {IUser} from './interfaces/IUser'

import * as contributors from './contributors'

export const processIssue = async (payload: WebhookPayload) => {
  if (!payload.issue) {
    console.error('Issue was not provided.')
    return
  }

  await contributors.addContributor({}, ['bug'])

  console.dir(payload)

  if (payload.action === 'opened') {
    const user = payload.issue['user'] as IUser
    console.log(user.login)
  }
}

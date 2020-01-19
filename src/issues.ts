import {WebhookPayload} from '@actions/github/lib/interfaces'
import {IUser} from './interfaces/IUser'

export const processIssue = async (context: WebhookPayload) => {
  if (!context.issue) {
    console.error('Issue was not provided.')
    return
  }

  if (context.action === 'opened') {
    const user = context.issue['user'] as IUser
    console.log(user.login)
  }
}

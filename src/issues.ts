import {WebhookPayload} from '@actions/github/lib/interfaces'

export const processIssue = async (context: WebhookPayload) => {
  if (context.action === 'opened') {
    console.dir(context.issue)
  }
}

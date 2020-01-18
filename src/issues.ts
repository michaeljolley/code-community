import {WebhookPayload} from '@actions/github/lib/interfaces'

export const processIssue = async (context: WebhookPayload) => {
  console.log(context.action)
  if (context.action === 'opened') {
    console.dir(context.issue)
  }
}

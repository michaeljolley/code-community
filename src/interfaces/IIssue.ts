import {IUser} from './IUser'
import {ILabel} from './ILabel'

export interface IIssue {
  labels: ILabel[]
  user: IUser
}

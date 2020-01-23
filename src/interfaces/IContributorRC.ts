import {IContributor} from './IContributor'

// TODO: Add custom badge
// TODO: Add custom contributor template

export interface IContributorRC {
  contributors: IContributor[]
}

export const defaultRC: IContributorRC = {
  contributors: []
}

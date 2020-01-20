import {IContributor} from './IContributor'

// TODO: Add custom badge
// TODO: Add custom contributor template

export interface IContributorRC {
  contributionsPerLine: number
  skipCI: boolean
  files: string[]
  contributors: IContributor[]
}

export const defaultRC: IContributorRC = {
  contributionsPerLine: 7,
  skipCI: true,
  files: ['README.md'],
  contributors: []
}

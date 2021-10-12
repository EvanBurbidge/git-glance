import React from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import ActionsMenu from '../ActionsMenu';
import { RepoListLink } from './RepoListLink';
import { RepoMergeStatus } from './RepoMergeStatus';

export const RepoListItem = ({
  name = '',
  href = '',
  state = '',
  options = [],
  paddingAmount = '6',
  textSize = 'text-md',
  onClick = () => {},
  SubtitleComponent = <Fragment />
}) => (
  <div
    onClick={onClick}
    className={`w-full flex justify-between items-center py-${paddingAmount} border-b px-3 cursor-pointer hover:bg-gray-100`}
  >
    <div className="flex flex-col flex-grow w-3/4">
      <div className="flex items-center w-full align-center">
      <RepoMergeStatus state={state}/>
      <a href={href} className={`font-medium text-primary ${textSize} ml-2 truncate`} target="_blank" rel="noreferrer">{name}</a>
      </div>
      {SubtitleComponent}
    </div>
    <div className="flex justify-end flex-grow text-right">
      {Boolean(options.length) && <ActionsMenu options={options} />}
      <RepoListLink href={href} />
    </div>
  </div>
)
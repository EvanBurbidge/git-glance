import React from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import ActionsMenu from '../ActionsMenu';
import { RepoListLink } from './RepoListLink';

export const RepoListItem = ({
  name = '',
  href = '',
  options = [],
  paddingAmount = '6',
  textSize = 'text-lg',
  onClick = () => {},
  SubtitleComponent = <Fragment />
}) => (
  <div
    onClick={onClick}
    className={`w-full flex justify-between items-center py-${paddingAmount} border-b px-3 cursor-pointer hover:bg-gray-100`}
  >
    <div className="flex-grow flex flex-col w-3/4">
      <h5 className={`font-medium text-primary ${textSize} truncate`}>{name}</h5>
      {SubtitleComponent}
    </div>
    <div className="flex-grow flex justify-end text-right">
      {Boolean(options.length) && <ActionsMenu options={options} />}
      <RepoListLink href={href} />
    </div>
  </div>
)
import React from 'react';
import ReactTooltip from 'react-tooltip';

export const RepoMergeStatus = ({
  state = '',
}) => {
  if (!state) {
    return (
      <>
        <ReactTooltip />
        <div className="w-3 h-3 rounded-full border-primary border" data-tip="No status yet on this pr" />
      </>
    )
  }
  if (state === 'CHANGES_REQUESTED') {
    return (
      <>
        <ReactTooltip />
        <div className="w-3 h-3 rounded-full bg-error" data-tip="Changes requested"/>
      </>
    )
  }
  if (state  === 'COMMENTED') {
    return (
      <>
        <ReactTooltip />
        <div className="w-3 h-3 rounded-full bg-warning" data-tip="Has comments"/>
      </>
    )
  }
  return (
    <>
      <ReactTooltip />
      <div className="w-3 h-3 rounded-full bg-success" data-tip="Ready to merge" />
    </>
  )
}
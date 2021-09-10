import React from 'react';
import ReactTooltip from 'react-tooltip';

export const RepoMergeStatus = ({
  mergeStatus = {},
}) => {
  if (mergeStatus.CHANGES_REQUESTED > 0) {
    return (
      <>
        <ReactTooltip />
        <div className="w-3 h-3 rounded-full bg-error" data-tip="Changes requested"/>
      </>
    )
  }
  if (mergeStatus.COMMENTED > 0) {
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
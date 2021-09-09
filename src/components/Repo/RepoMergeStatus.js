import React from 'react';

export const RepoMergeStatus = ({
  mergeStatus = {},
}) => {
  if (mergeStatus.CHANGES_REQUESTED > 0) {
    return (
      <div className="w-3 h-3 rounded-full bg-error" />
    )
  }
  if (mergeStatus.COMMENTED > 0) {
    return (
      <div className="w-3 h-3 rounded-full bg-warning" />
    )
  }
  return (
    <div className="w-3 h-3 rounded-full bg-success" />
  )
}
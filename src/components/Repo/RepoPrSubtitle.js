import React from 'react';
import dayjs from 'dayjs';
import { RepoMergeStatus } from './RepoMergeStatus';
import { AnnotationIcon, UserIcon } from '@heroicons/react/solid';

export const RepoPrSubtitle = ({
  state,
  author,
  repoName,
  createdAt,
  commentsCount = 0,
}) => {
  return (
    <div className="flex items-center mt-3">
      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <RepoMergeStatus state={state} />
          <p className="ml-1 font-bold text-primary mr-1 text-sm">{repoName}</p>
          <p className="text-sm text-primary">{dayjs(createdAt).format('DD/MM/YYYY')}</p>
        </div>
        <hr />
        <div className="flex items-center mt-2">
          <UserIcon className=" h-3 w-3 text-primary" />
          <p className="ml-1 font-bold text-primary mr-1 text-sm">{author.login}</p>
          {commentsCount > 0 && (
            <>
              <AnnotationIcon className="-mr-1 ml-2 h-4 w-4 text-primary" />
              <p className="ml-1 text-xs font-bold font-primary">
                {commentsCount}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
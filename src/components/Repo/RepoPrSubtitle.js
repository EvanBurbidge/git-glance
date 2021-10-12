import React from 'react';
import dayjs from 'dayjs';
import ReactTooltip from 'react-tooltip';
import { AnnotationIcon, ClockIcon, UserIcon } from '@heroicons/react/solid';

export const RepoPrSubtitle = ({
  author,
  createdAt,
  commentsCount = 0,
}) => {
  return (
    <div className="flex items-start mt-3 center">
      <ReactTooltip />
      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <ClockIcon data-tip={`Opened ${dayjs(createdAt).format('DD/MM/YYYY')}`} className="w-4 h-4 text-primary" />
          <p className="ml-1 mr-2 text-sm text-primary">{dayjs(createdAt).format('DD/MM/YYYY')}</p>
          <UserIcon className="w-4 h-4 text-primary"/>
          <p className="ml-1 mr-2 text-sm text-primary">{author.login}</p>
          {commentsCount > 0 && (
            <>
              <AnnotationIcon data-tip={`${commentsCount} ${commentsCount > 1 ? 'comments' : 'comment'}`} className="w-4 h-4 text-primary" />
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
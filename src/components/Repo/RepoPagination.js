import React from 'react';

export const RepoPagination = ({
  pagingInfo,
  setCurrentBefore = () => { },
  setCurrentAfter = () => { },
}) => {
  return (
    <div className="flex border-t border-primary">
      {pagingInfo.hasPreviousPage && <div onClick={setCurrentBefore} className="flex-grow font-medium text-primary tracking-tight p-2 text-center hover:bg-gray-100 cursor-pointer border-r border-primary">Newer</div>}
      {pagingInfo.hasNextPage && <div onClick={setCurrentAfter} className="flex-grow p-2 font-medium text-primary tracking-tight text-center hover:bg-gray-100 cursor-pointer">Older</div>}
    </div>
  );
}
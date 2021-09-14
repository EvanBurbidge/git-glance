import React from 'react';

export const RepoPagination = ({
  fetchMorePrs = () => { },
}) => (
  <div className="flex border-t border-primary">
    <div onClick={fetchMorePrs} className="flex-grow p-2 font-medium text-primary tracking-tight text-center hover:bg-gray-100 cursor-pointer">Older</div>
  </div>
);
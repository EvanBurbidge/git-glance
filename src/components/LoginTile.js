import React from 'react';

export const LoginTile = ({
  provider = 'github',
}) => (
  <div className="w-full border border-gray-100 rounded-sm">
    <p>{provider}</p>
  </div>
)
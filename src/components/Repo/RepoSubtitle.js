import React from 'react';

export const RepoSubtitle = ({ prCount }) => (
  <p className="text-primary text-sm">
    Open pull requests <span className="font-bold">{prCount}</span>
  </p>
)
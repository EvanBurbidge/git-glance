import React from 'react';
import { ExternalLinkIcon } from '@heroicons/react/solid';

export const RepoListLink = ({ href }) => (
  <a href={href} target="_blank" rel="noreferrer" className="text-primary text-sm">
    <ExternalLinkIcon width="20" height="20"/>
  </a>
)
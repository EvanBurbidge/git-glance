import React from 'react';
import ActionsMenu from './ActionsMenu';

const RequestQuerySelector = ({
  updatePrQuerySelection = () => {},
}) => {
  const options = [
    { label: 'Created', action: () => {}},
    { label: 'Assigned', action: () => {}},
    { label: 'Mentioned', action: () => {}},
    { label: 'Review Requested', action: () => {}},
  ]
  return (
    <ActionsMenu
      options={options}
    />
  )
};

export default RequestQuerySelector;
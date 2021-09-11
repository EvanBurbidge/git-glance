import React from 'react';

import { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ReposSearchBar({
  isToggled = true,
  handleToggleFilter = () => {},
}) {
  const [enabled, setEnabled] = useState(isToggled)

  useEffect(() => {
    handleToggleFilter(enabled);
  }, [enabled]) // eslint-disable-line

  return (
    <div className="mt-3 p-2 flex align-center items-center justify-end border-b border-gray-200">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-highlight"
      >
        <span className="sr-only">Use setting</span>
        <span aria-hidden="true" className="pointer-events-none absolute bg-white w-full h-full rounded-md" />
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'bg-highlight' : 'bg-gray-200',
            'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'
          )}
        />
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'
          )}
        />
      </Switch>
      <p className="ml-3 text-primary">Show Open PR's only</p>
    </div>
  )
}
import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ActionsMenu({
  actions = [],
  currentUser = {},
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <MenuIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {/* <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"> */}
          
        
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {currentUser.uid && (
            <div className="flex items-center justify-start p-3 border-b border-gray-200 divider-y align-center">
              <img src={currentUser.photoURL} className="inline object-cover w-10 h-10 mr-2 border rounded-full border-primary" alt="user avatar"/>
              <p className="text-sm font-semibold text-primary">
                {currentUser.email}
              </p>
            </div>
          )}
          <div className="py-1">
            {actions.map(option => (
              <Menu.Item key={option.label} onClick={option.action}>
                {({ active }) => (
                  <span
                    className={classNames(
                      active ? 'bg-gray-100 text-primary' : 'text-primary',
                      'block px-4 py-2 text-sm cursor-pointer',
                      option.divider ? 'border-t border-gray-200' : ''
                    )}
                  >
                    {option.label}
                  </span>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
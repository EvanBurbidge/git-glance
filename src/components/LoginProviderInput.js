import React, { useState } from 'react';

import { Button } from './Button';

export const LoginProviderInput = ({ onSave = () => {} }) => {
  const [providerId, setProviderId] = useState('');
  const handleSave = () => onSave(providerId);
  const onChange = ({ target: { value }}) => setProviderId(value)
  return (
    <div className="flex flex-col w-full">
      <div className="mb-3">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Provider</label>
        <div className="mt-1">
          <input type="text" onChange={onChange} name="provider" id="provider" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-highlight focus:border-highlight sm:text-sm" placeholder="github.com" />
        </div>
      </div>
      <div className="w-full text-center">
      <Button classes="w-full" onClick={handleSave} disabled={providerId.length < 5}>
        Login
      </Button>
      </div>
    </div>
  )
}
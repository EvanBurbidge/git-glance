import React, { useState } from 'react';

import { Button } from './Button';

export const LoginProviderInput = ({ onSave = () => {} }) => {
  const [providerId, setProviderId] = useState('');
  const handleSave = () => onSave(providerId);
  const onChange = ({ target: { value }}) => setProviderId(value)
  return (
    <div className="flex flex-col w-full">
      <div className="mb-3">
        <label for="email" className="block text-sm font-medium text-gray-700">Provider</label>
        <div className="mt-1">
          <input type="text" onChange={onChange} name="provider" id="provider" className="shadow-sm focus:ring-highlight focus:border-highlight block w-full sm:text-sm border-gray-300 rounded-md" placeholder="github.com" />
        </div>
      </div>
      <div>
      <Button onClick={handleSave} disabled={providerId.length < 5}>
        Login
      </Button>
      </div>
    </div>
  )
}
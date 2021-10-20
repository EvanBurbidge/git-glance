import React from 'react';

export const LoginTile = ({
  provider = 'github',
  imgSrc = ""
}) => (
  <div className="w-full border border-gray-100 rounded-sm p-4 flex align-center items-center justify-between hover:border-highlight cursor-pointer hover:outline-highlight">
    <img src={imgSrc} alt="login tile icon" className="w-1/3"/>
    <p className="text-primary font-semibold hover:text-highlight cursor:pointer">{provider}</p>
  </div>
)
import React from 'react';

export const LoginTile = ({
  imgSrc = "",
  provider = 'github',
  onClick = () => {},
}) => (
  <div className={`w-full border border-primary mb-3 rounded-sm p-4 flex align-center items-center justify-between hover:border-highlight cursor-pointer hover:outline-highlight`} onClick={onClick}>
    <img src={imgSrc} alt="login tile icon" className="w-1/4"/>
    <p className="capitalize text-primary font-semibold hover:text-highlight cursor:pointer">{provider}</p>
  </div>
)
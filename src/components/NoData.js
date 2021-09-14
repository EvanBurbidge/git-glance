import React from 'react';
import Octo from '../assets/octocat.svg';


const NoData = () => (
    <>
      <div className="flex flex-col pt-10 w-full h-screen justify-center align-center items-center text-primary text-center px-5">
        <img src={Octo} alt="github-logo" className="w-1/2 mb-6 h-auto" />
        <h3 className="tracking-tight font-bold text-xl text-primary">
          Looks like there is no data
        </h3>
        <p className="mt-3 text-base text-gray-500 mb-6">Why don't you try another category?</p>
      </div>
    </>
  )


export default NoData;
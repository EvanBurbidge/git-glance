import React from 'react';
import Octo from '../assets/octocat.svg';
import { Loading } from './Loading';


const NoData = ({
  loading = true,
  showMessage = true,
}) => (
    <>
      <div className="flex flex-col pt-10 w-full h-screen justify-center align-center items-center text-primary text-center px-5">
        <img src={Octo} alt="github-logo" className="w-1/2 mb-6 h-auto" />
        {loading && <Loading height="h-10" width="w-10"/>}
      </div>
    </>
  )


export default NoData;
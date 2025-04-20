"use client"

import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Navbar from '@/app/widgets/navbar/navbar';
import { useGoogleLogin } from '@react-oauth/google';
import { usePost } from '@/utils/api/apiService';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Page() {
  const router = useRouter();
  const post = usePost('users/google/login');

  const [isLoading, setisLoading] = useState(false)

  const googleLogin = useGoogleLogin({
    onSuccess: credentialResponse => {
      // console.log(credentialResponse);
      setisLoading(false)
      post.mutate({ google_auth_token: credentialResponse.access_token }, { onSuccess: (data: any) => {
        Cookies.set('access_token', data.access_token, {
          path: '/',
          maxAge: 60 * 60 * 24 * 365, // in seconds
          sameSite: 'Strict',
          secure: true,
        });
        router.push('/playlists');
      } }); 
    },
    onError: error => {
      console.log(error);
      setisLoading(false)
    }
  });

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="container mx-auto p-4 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-3xl font-bold mb-4">Login to Continue</h1>
            <button
              className="bg-white hover:bg-blue-500 text-black font-bold py-5 px-12 rounded-xl shadow-2xl flex items-center space-x-4"
              onClick={() => { googleLogin(); setisLoading(true) }}
            >

              {isLoading ? <div className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Loading</span>
              </div> : <><FcGoogle size={36} className='mr-2' />Continue with Google</>}
            </button>
            <button
              className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-5 px-12 rounded-xl shadow-2xl flex items-center space-x-4"

            >
              <FaGithub size={36} className='mr-2' />
              Continue with GitHub
            </button>
            {/* <button
              className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-5 px-12 rounded-xl shadow-2xl flex items-center space-x-4"

            >
              <FaApple size={36} className='mr-2'/>
              Sign in with Apple
            </button> */}
          </div>
        </div>
      </div>
    </>
  )
}

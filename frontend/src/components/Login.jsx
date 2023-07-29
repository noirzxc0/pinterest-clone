import React, { useEffect} from 'react'
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import shareVideo from '../assets/share.mp4'
import { gapi } from 'gapi-script'

import { client } from '../client'

const Login = () => {
  const clientId ="186256681547-i21h5k6v3nij8trksjpvcevvbe99baht.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj))
    const { name, googleId, imageUrl } = response.profileObj
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    }
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true })
    })
  }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
         src={shareVideo}
         type="video/mp4"
         loop
         controls={false}
         muted
         autoPlay
         className='w-full h-full object-cover'
        />
      </div>

      <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-gray-900 bg-opacity-50">

        <div className="shadow-2xl">
          <GoogleLogin
            clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
            render={(renderProps) => (
              <button
                type='button'
                className='flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className='mr-4 w-6 h-6' /> Continue in with google
              </button>
            )}

            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy='single_host_origin'
          />
        </div>
      </div>
    </div>
  )
}

export default Login
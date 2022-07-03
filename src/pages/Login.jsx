import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {user, logIn} = UserAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await logIn(email,password)
            navigate('/')            
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }

  return (
   <>
       <div className='w-full h-screen'>
             <img className='hidden sm:block absolute w-full h-full object-cover'src="https://assets.nflxext.com/ffe/siteui/vlv3/271ac55e-7228-438e-824e-92db37981e59/39e7ea48-b4a2-48a3-b993-a228b283a9bf/PH-en-20220627-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
            <div className='fixed w-full px-4 py-24 z-50'>

            <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
                <div className='max-w-[320px] mx-auto py-16'>
                    <h1 className='text-3xl font-bold'>Sign In</h1>
                        {error ? <p className='p-3 bg-red-400 my-3'>{error}</p> : null}
                    <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                        <input onChange={(e) => setEmail(e.target.value.toLowerCase())}
                        className='p-3 my-2 bg-gray-700 rounded' type="email" placeholder='Email' required autoComplete='email' />
                        <input onChange={(e) => setPassword(e.target.value.toLowerCase())}
                        className='p-3 my-2 bg-gray-700 rounded' type="password" placeholder='Password' required/>
                        <button className='bg-red-600 py-3 my-6 rounded font-bold'>Sign In</button>
                        
                        <div className='flex items-center justify-between text-sm text-gray-400'>
                            <p><input className='mr-2' type="checkbox"/> Remember Me</p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
   </>
  )
}

export default Login

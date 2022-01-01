import React, { useState } from 'react'
import Head from 'next/head'

import { SuccessToaster, LoadingToaster } from '../../components/SuccessToaster'

const Register = () => {
       const [ identity, setIdentity ] = useState({
              name: "",
              email: "",
              password: ""
       })

       const [ notification, setNotification ] = useState("")

       const handlerRegister = async(event) => {
              event.preventDefault()

              setNotification(<LoadingToaster>Loading ...</LoadingToaster>)

              const JsonBody = JSON.stringify(identity)
              
              const RequestApiRegister = await fetch("/api/auth/register", {
                      method: "POST",
                      body: JsonBody,
                      headers: {
                             "Content-Type": "application/json"
                      }
              })

              if(!RequestApiRegister.ok) setNotification(`Failed to registered ${ RequestApiRegister.status }`)

              const ResponseApiRegister = await RequestApiRegister.json()
              console.log(ResponseApiRegister);

              setTimeout(() => {
                     setNotification(<SuccessToaster>Successfully Registered</SuccessToaster>)
              }, 4000)

              setTimeout(() => {
                     setNotification("")
              }, 6000)
       }

       const inputHandler = (event) => {
              const name = event.target.getAttribute('name')
              setIdentity({
                     ...identity,
                     [name]: event.target.value
              })
       }
       return (
              <React.Fragment>
                     <Head>
                            <title>Ferdian - Register Page</title>
                            <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <meta http-equiv="X-UA-Compatible" content="IE-Edge" />
                            <meta name="description" content="nextjs auth" />
                     </Head>
                     {/* <!-- Heading Login Form --> */}
                     <div className="headingLogin max-w-2xl m-auto mt-8 text-center">
                            <h1 className="text-[2rem] font-bold md:text-heading-lg">Get your free account</h1>
                            <p className="text-small text-gray-500 font-normal pt-2">Join and get easy way experience to manage your business!</p>	
                     </div>
                     {/* <!-- Login Form --> */}
                     <form onSubmit={handlerRegister.bind(this)} className="max-w-sm m-auto mt-8 mb-8 rounded-lg border border-gray-300 py-8 px-10" action="" method="">
                            {/* <!-- Form Full Name --> */}
                            <div className="mb-4">
                                   <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
                                   <input onChange={inputHandler.bind(this)} type="text" id="name" name="name" placeholder="ex. Ferdian Ahmad" className="appereance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight" />
                            </div>
                            {/* <!-- Form Email Address --> */}
                            <div className="mb-4">
                                   <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                                   <input onChange={inputHandler.bind(this)} type="text" id="email" name="email" placeholder="example@email.com" className="appereance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight" />
                            </div>
                            {/* <!-- Form Password --> */}
                            <div className="mb-4">
                                   <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                                   <input onChange={inputHandler.bind(this)} type="password" id="password" name="password" placeholder="Password" className="appereance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight" />
                            </div>
                            {/* <!-- Input Checkbox --> */}
                            <div className="mb-4">
                                   <label htmlFor="checkbox" className="inline-flex items-center">
                                          <input type="checkbox" className="form-checkbox h-5 w-5 text-dark" name="" id="" defaultChecked />
                                          <span className="text-blue-800  text-xs pl-2">I agree to the ToS and Privacy Policy</span>
                                   </label>
                            </div>
                            {/* <!-- Register Button --> */}
                            <button type='submit' className="mb-4 w-full text-center font-bold ml-0 no-underline inline-block px-4 py-2 leading-none bg-blue-800 border-blue-800 border rounded text-white hover:border-transparent hover:bg-white hover:text-blue-800 mt-4 sm:mt-0">
                                   <p className="text-lg font-bold">Register</p>
                            </button>
                            {/* Registered Status */}
                            <h1 className='font-bold tet-blue-500 font-sans'>Status : <br/> { notification }</h1>
                            {/* <!-- Google OAuth Button --> */}
                            <div className="mb-4">
                                   <button type='submit' className="w-full flex justify-center items-center text-center font-bold ml-0 no-underline px-4 py-2 leading-none bg-white rounded text-blue-800 hover:bg-white mt-4 sm:mt-0">
                                          <p className="text-lg">Google</p>
                                   </button>
                            </div>
                            {/* <!-- Forgot Password --> */}
                            <div className="flex">
                                   <p className="text-sm text-gray-500">Already have an account ?</p>
                                   <a href="/forgot-password" className="text-blue-800 text-sm pl-1">Sign in here</a>
                            </div>
                     </form>
              </React.Fragment>
       )
}

export default Register
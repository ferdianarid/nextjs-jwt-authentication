import React, { useState, useEffect } from "react"

import Head from "next/head"
import Router from "next/router"

import cookies from "next-cookies"
import Cookie from "js-cookie"

import { LoadingToaster, SuccessToaster } from "../../components/Toaster"

export async function getServerSideProps (context) {
       const responseCookies = cookies(context)

       const checkTokens = responseCookies.token

       if(checkTokens)
              context.res.writeHead(302, {
              Location: "/posts"
       })

       return {
              props: {}, data: {}
       }
}

const Login = () => {
       const [ loginValue, setLoginValue ] = useState({
              email: "",
              password: ""
       })

       const [ notification, setNotification ] = useState("")

       /*useEffect(() => {
              console.log("Hello Effect");
              const token = Cookies.get("token")

              if(token) Router.push("/posts")
       }, [])*/

       const  LoginHandler = async( event ) => {
              event.preventDefault()
              
              setNotification(<LoadingToaster>Loading ...</LoadingToaster>)

              const JsonBody = JSON.stringify(loginValue)

              const RequestApiLogin = await fetch("/api/auth/login", {
                     method: "POST",
                     headers: {
                            "Content-Type": "application/json"
                     },
                     body: JsonBody
              })

              if(!RequestApiLogin.ok) setNotification(`Failed Authentication ${RequestApiLogin.status}`)

              const ResponseApiLogin = await RequestApiLogin.json()
              console.log(ResponseApiLogin);

              Cookie.set('token', ResponseApiLogin.token)

              setTimeout(() => {
                     setNotification(<SuccessToaster>Successfully Login</SuccessToaster>)
              }, 4000)

       }

       const  inputHandler = (event) => {
              const name = event.target.getAttribute("name")
              setLoginValue({
                     ...loginValue,
                     [name]: event.target.value
              })
       }
       return (
              <React.Fragment>
                     <Head>
                            <title>Ferdian - Login Page</title>
                            <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <meta httpEquiv="X-UA-Compatible" content="IE-Edge" />
                            <meta name="description" content="nextjs auth" />
                     </Head>
                     {/* <!-- Heading Login Form --> */}
                     <div className="headingLogin max-w-2xl m-auto mt-8 text-center">
                            <h1 className="text-[2rem] font-bold md:text-heading-lg">Lets Login to your Account</h1>
                            <p className="text-small text-gray-500 font-normal pt-2">Join and get easy way experience to manage your business!</p>	
                     </div>
                     {/* <!-- Login Form --> */}
                     <form onSubmit={LoginHandler.bind(this)} className="max-w-sm m-auto mt-8 mb-8 rounded-lg border border-gray-300 py-8 px-10" action="" method="">
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
                            {/* <!-- Login Button --> */}
                            <button type='submit' className="mb-4 w-full text-center font-bold ml-0 no-underline inline-block px-4 py-2 leading-none bg-blue-800 border-blue-800 border rounded text-white hover:border-transparent hover:bg-white hover:text-blue-800 mt-4 sm:mt-0">
                                   <p className="text-lg font-bold">Login</p>
                            </button>
                            {/* Registered Status */}
                            <h1 className='font-bold tet-blue-500 font-sans'>Status : <br/> { notification }</h1>
                            {/* <!-- Forgot Password --> */}
                            <div className="flex">
                                   <p className="text-sm text-gray-500">Already have an account ?</p>
                                   <a href="/forgot-password" className="text-blue-800 text-sm pl-1">Sign in here</a>
                            </div>
                     </form>
              </React.Fragment>
       )
}

export default Login
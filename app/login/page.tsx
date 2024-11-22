"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import Logo from "@/public/assets/wildcart-logo.png"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { checkAuth } from "@/utils/auth";

export default function Login() {
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    const router = useRouter();

    useEffect(() => {
        const user = checkAuth();
        if (user) {
            router.push('/main')
        } 
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    });

    
  const setSessionCookie = (userData) => {
    Cookies.set('session', JSON.stringify(userData), {
      expires: 1,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });
  };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
    
        try {
          const response = await fetch('http://localhost:8080/api/users/email/' + formData.email);
          const userData = await response.json();
    
          if (response.ok) {
            if (userData.password === formData.password) {
                const sanitizedUserData = {
                    userId: userData.userId,
                    name: userData.name,
                    email: userData.email,
                    studentId: userData.studentId,
                    course: userData.course
                  };
        
                  setSessionCookie(sanitizedUserData);
              localStorage.setItem('user', JSON.stringify(userData));
              router.push('/main');
            } else {
              setErrorMessage('Invalid email or password');
            }
          } else {
            setErrorMessage('Invalid email or password');
          }
        } catch (err) {
          setErrorMessage('Something went wrong. Please try again.');
          console.log(err)
        } finally {
          setLoading(false);
        }
    
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r to-[#800000] from-[#F2E8C6]">
            </div>
        );
    }

    return (
        <>
            <div className="bg-gradient-to-r to-[#800000] from-[#F2E8C6] h-dvh w-full px-14 grid grid-cols-2 items-center justify-center">
                <div className="flex justify-center items-center w-full">
                    <Image
                        className="w-full transition-all duration-700 animate-float-in opacity-0"
                        style={{ width: 400, height:200, animationDelay: `${1 * 100}ms` }}
                        src={Logo}
                        width={300}
                        height={300}
                        alt="Logo"/>
                </div>
                <div className="flex items-center justify-center h-full">
                        <div style={{ animationDelay: `${3 * 100}ms` }} className="w-[70%] flex-col bg-[#F2E8C6] bg-opacity-50 transition-all duration-700 animate-float-in opacity-0 shadow-lg items-center border-2 p-10 rounded-3xl justify-center">
                            <form className="w-full" onSubmit={handleSubmit}>
                                <h1 style={{ animationDelay: `${4 * 100}ms` }} className="font-bold mb-5 text-xl ml-2 transition-all duration-700 animate-float-in opacity-0">Login</h1>
                                
                                <div className="flex w-full flex-col items-center justify-center">
                                    <div className="w-[90%] grid grid-cols-2 gap-3 mb-3">
                                        <Input placeholder="Email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            style={{ animationDelay: `${5 * 100}ms` }}
                                            className="col-span-2 placeholder:text-white transition-all duration-700 animate-float-in opacity-0"
                                            required/>
                                    </div>
                                    <div className="w-[90%] grid grid-cols-2 gap-3 mb-3">
                                        <Input placeholder="Password"
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            style={{ animationDelay: `${6 * 100}ms` }}
                                            className="col-span-2 placeholder:text-white transition-all duration-700 animate-float-in opacity-0"
                                            required/>
                                    </div>
                                    {errorMessage && <p className="text-red-500 text-sm mb-3">{errorMessage}</p>}
                                </div>

                                <div className="flex w-full justify-center flex-col items-center">
                                    <Button type="submit" style={{ animationDelay: `${7 * 100}ms` }} disabled={loading} className="w-[80%] mt-5 transition-all duration-700 animate-float-in opacity-0">{loading ? 'Logging in...' : 'Login'}</Button>
                                    <Separator style={{ animationDelay: `${8 * 100}ms` }} className="bg-current my-5 w-[80%] h-[1px] transition-all duration-700 animate-float-in opacity-0"/>

                                    <div style={{ animationDelay: `${9 * 100}ms` }} className="flex w-full justify-center transition-all duration-700 animate-float-in opacity-0">
                                        <p>Don&apos;t have an account yet? <a href="/signup" className="text-blue-800 hover:underline">Sign up here</a>.</p>
                                    </div>
                                </div>
                                </form>  
                        </div>                  
                </div>
            </div>
        </>
    )
}
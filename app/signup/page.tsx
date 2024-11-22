"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import Logo from "@/public/assets/wildcart-logo.png"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/utils/auth";

export default function SignUp() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        course: '',
        studentId: '',
        email: '',
        mobileNumber: '',
        password: '',
        address: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const user = checkAuth();
        if (user) {
            router.push('/main')
        } 
        setIsLoading(false);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(confirmPassword != formData.password){
        return setErrorMessage("Passwords do not match.")
    }

    if(formData.password.length <= 8){
        return setErrorMessage("Password must be at least 8 characters.")
    }

    //regex tester
    const phoneRegex = /^(?:\(\+63\)\d{10}|\d{11})$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const schoolIdRegex = /^\d{2}-\d{4}-\d{3}$/;

    if(!schoolIdRegex.test(formData.studentId)){
        return setErrorMessage("Invalid school id number. Must be XX-XXXX-XXX.")
    }

    if(!emailRegex.test(formData.email)){
        return setErrorMessage("Invalid email");
    }

    if(!phoneRegex.test(formData.mobileNumber.replace(/\s|\(|\)|-/g, ''))){
        return setErrorMessage("Invalid phone number.");
    }

    try {
        const response = await fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const userData = await response.json();
            alert("User created successfully!");
            router.push("/main");
            console.log(userData);
        } else {
            const errorData = await response.json();
            console.log(errorData);
            setErrorMessage("Failed to create a user.");
        }
    } catch (error) {
        console.error('Network Error:', error);
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
                    <div style={{ animationDelay: `${3 * 100}ms` }} className="w-[90%] transition-all duration-700 animate-float-in opacity-0 flex-wrap bg-[#F2E8C6] bg-opacity-50 shadow-lg items-center border-2 p-10 rounded-3xl justify-center">
                    <form
                        onSubmit={handleSubmit}
                        > 
                        <h1 style={{ animationDelay: `${4 * 100}ms` }} className="transition-all duration-700 animate-float-in opacity-0 font-bold mb-3 text-xl ml-2">Sign up</h1>
                        <div className="w-full grid grid-cols-2 gap-3 mb-3">
                            <Input placeholder="Fullname"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                style={{ animationDelay: `${5 * 100}ms` }}
                                className="transition-all duration-700 animate-float-in opacity-0 col-span-2 placeholder:text-white" required/>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-3 mb-3">
                            <Input placeholder="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                style={{ animationDelay: `${6 * 100}ms` }}
                                className="transition-all duration-700 animate-float-in opacity-0 col-span-1 placeholder:text-white" required/>
                            <Input placeholder="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{ animationDelay: `${5 * 100}ms` }}
                                className="transition-all duration-700 animate-float-in opacity-0 col-span-1 placeholder:text-white" required/>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-3 mb-3">
                            <Input placeholder="Student ID No."
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleInputChange}
                                style={{ animationDelay: `${7 * 100}ms` }}
                                className="transition-all duration-700 animate-float-in opacity-0 col-span-1 placeholder:text-white" required/>
                            <Input placeholder="Course"
                                  name="course"
                                  value={formData.course}
                                  onChange={handleInputChange}
                                  style={{ animationDelay: `${8 * 100}ms` }}
                                  className="transition-all duration-700 animate-float-in opacity-0 col-span-1 placeholder:text-white" required/>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-3 mb-3">
                          <Input placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                style={{ animationDelay: `${9 * 100}ms` }}
                                className="transition-all duration-700 animate-float-in opacity-0 col-span-1 placeholder:text-white" required/>
                          <Input placeholder="Mobile Number"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleInputChange}
                                style={{ animationDelay: `${10 * 100}ms` }}
                                className="transition-all duration-700 animate-float-in opacity-0 col-span-1 placeholder:text-white" required/>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-3 mb-3 placeholder:text-white">
                          <Input placeholder="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                style={{ animationDelay: `${11 * 100}ms` }}
                                className="transition-all duration-700 animate-float-in opacity-0 col-span-2 placeholder:text-white"
                                required/>
                        </div>

                        {errorMessage && <p className="text-red-500 text-sm mb-3">{errorMessage}</p>}

                        <div className="flex w-full justify-center flex-col items-center">
                            <Button type="submit" style={{ animationDelay: `${12 * 100}ms` }} className="transition-all duration-700 animate-float-in opacity-0 w-[80%] mt-10">Sign up</Button>
                            <Separator style={{ animationDelay: `${13 * 100}ms` }} className="transition-all duration-700 animate-float-in opacity-0 bg-current my-5 w-[80%] h-[1px]"/>

                            <div style={{ animationDelay: `${14 * 100}ms` }} className="transition-all duration-700 animate-float-in opacity-0 flex w-full justify-center">
                                <p>Already have an account? <a href="/login" className="text-blue-800 hover:underline">Login here</a>.</p>
                            </div>
                        </div>
                        </form>
                    </div>                    
                </div>
            </div>
        </>
    )
}
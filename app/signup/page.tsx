import Footer from "@/components/landingpage/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";

export default function SignUp() {
    return (
        <>
            <div className="h-dvh w-full flex flex-col items-center justify-center">
                <div className="flex items-center h-full w-[50%]">
                    <div className="w-full flex-wrap items-center border-2 p-20 rounded-3xl justify-center">
                        <div className="w-full grid grid-cols-2 gap-3 mb-3">
                            <Input placeholder="Fullname" className="col-span-2"/>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-3 mb-3">
                            <Input placeholder="Password" className="col-span-1"/>
                            <Input placeholder="Confirm Passowrd" className="col-span-1"/>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-3 mb-3">
                            <Input placeholder="Student ID No." className="col-span-1"/>
                            <Input placeholder="Course" className="col-span-1"/>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-3 mb-3">
                          <Input placeholder="Email" className="col-span-1"/>
                          <Input placeholder="Mobile Number" className="col-span-1"/>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-3 mb-3">
                          <Input placeholder="Address" className="col-span-2"/>
                        </div>

                        <div className="flex w-full justify-center flex-col items-center">
                            <Button className="w-[80%] mt-10">Sign up</Button>
                            <Separator className="bg-slate-600 my-5 w-[80%] h-0.5"/>

                            <div className="flex w-full justify-center">
                                <p>Already have an account? <a href="/login" className="text-blue-500">Login here</a>.</p>
                            </div>
                        </div>
                    </div>                    
                </div>
                <Footer/>
            </div>
        </>
    )
}
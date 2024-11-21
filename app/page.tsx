"use client"
import Footer from "@/components/landingpage/Footer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  return(
    <>
      <div className="w-full h-dvh items-center flex-col flex">
        <div className=" flex h-full items-center gap-10 justify-center">
          <Button onClick={() => router.push("/login")} className="rounded-3xl w-28">Login</Button>
          <Button onClick={() => router.push("/signup")}className="rounded-3xl w-28">Sign up</Button>
        </div>
        <Footer/>
      </div>
    </>
  )
}
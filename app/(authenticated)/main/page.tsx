"use client"

import LogoutButton from "@/components/LogoutButton";
import { UserData, checkAuth } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Main() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const user = checkAuth();
        if (user) {
            setUserData(user);
        } else {
            router.push('/login');
        }
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div className="w-dvw h-dvh flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
        );
    }

    if (!userData) {
        return null;
    }
    
    return (
        <div className="w-dvw h-dvh flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Welcome to wildcart, {userData.name}!</h1>
            <LogoutButton className="px-10 rounded-2xl mt-5"/>
        </div>
    );
}
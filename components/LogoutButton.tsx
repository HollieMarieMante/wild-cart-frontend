"use client"

import { logout } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton({ className = "" }: { className?: string }) {
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <button 
            onClick={handleLogout}
            className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors ${className}`}
        >
            Logout
        </button>
    );
}
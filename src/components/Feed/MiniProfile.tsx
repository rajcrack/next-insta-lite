"use client";
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react';

export default function MiniProfile() {
    const { data: session } = useSession();
    let userData: any = session?.user;
    return (
        <div className='flex items-center justify-between mt-14 ml-10 w-full'>
            <img src={userData?.image || "/800px-Instagram_logo_2016.webp"} alt='Profile Picture' className='w-16 h-16 rounded-full border p-[2px]' />
            <div className='flex-1 ml-4'>
                <h2 className='font-bold'>{userData?.username}</h2>
                <h3 className='text-sm text-gray-400'>Welcome to Instagram Next Lite</h3>
            </div>
            <div>
                {session
                    ? // show signout for loggedIn
                    <button onClick={() => signOut()} className='text-blue-500 text-sm font-semibold'>Sign Out</button>
                    : // show sign in for Logged Out
                    <button onClick={() => signIn()} className='text-blue-500 text-sm font-semibold'>Sign In</button>
                }
            </div>
        </div>
    )
}

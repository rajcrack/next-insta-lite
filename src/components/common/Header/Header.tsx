"use client";
import Link from 'next/link'
import Image from 'next/image';
import React from 'react'
import { signIn, useSession, signOut } from 'next-auth/react';

export default function Header() {
    const { data: session } = useSession();
    console.log(session);
    return (
        <div className='shadow-sm border-b sticky top-0 bg-white z-30 p-3'>
            <div className='flex justify-between items-center max-w-6xl mx-auto'>
                {/* logo  */}
                <Link href='/'>
                    <Image className='hidden lg:inline-flex' src='/Instagram_logo_black.webp' alt='Logo' width={96} height={96} />
                    <Image className='lg:hidden' src='/800px-Instagram_logo_2016.webp' alt='Logo' width={40} height={40} />
                </Link>
                {/* search Input */}

                <input type="text" placeholder='Search' className='bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px]' />

                {/* Menu Items */}
                {session ?
                    (<img src={`${session.user?.image}`} alt={`${session.user?.name}`} onClick={() => signOut()} className='h-10 w-10 rounded-full cursor-pointer' />)
                    :
                    (<button onClick={() => signIn()} className='text-blue-600'>Log In</button>)
                }

            </div>
        </div>
    )
}

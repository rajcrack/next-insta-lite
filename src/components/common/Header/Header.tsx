"use client";
import Link from 'next/link'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { signIn, useSession, signOut } from 'next-auth/react';
import { HiCamera } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { UploadTask, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '@/firebase';
import { error } from 'console';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [imageFileUrl, setImageFileUrl] = useState<any>(null);
    const [isIMageUploading, setIsIMageUploading] = useState(false);


    // references
    const filePickerRef = useRef<any>(null);

    const addImageToPost = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImageFileUrl(URL.createObjectURL(file));

            console.log(imageFileUrl);
        }
    }

    useEffect(() => {
        if (selectedFile) {
            uploadImageToStorage();
        }
    }, [selectedFile]);

    async function uploadImageToStorage() {
        setIsIMageUploading(true);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + selectedFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask: UploadTask = uploadBytesResumable(storageRef, selectedFile);
        uploadTask.on(
            'state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress + ' % done');
            },
            (error) => {
                console.log("firebase ending error", error);
                setIsIMageUploading(false);
                setImageFileUrl(null);
                setSelectedFile(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((uri) => {
                    setImageFileUrl(uri);
                    setIsIMageUploading(false);
                });
            }
        );
    }

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
                    (<div className='flex gap-4 items-center'>
                        <IoMdAddCircleOutline className='text-2xl cursor-pointer hover:scale-125 transition-all duration-300 hover:text-red-600' onClick={() => setIsOpen(true)} />
                        <img src={`${session.user?.image}`} alt={`${session.user?.name}`} onClick={(e) => signOut()} className='h-10 w-10 rounded-full cursor-pointer' />
                    </div>)
                    :
                    (<button onClick={(e) => signIn()} className='text-blue-600 p-3'>Log In</button>)
                }

            </div>
            {isOpen && (<Modal
                onRequestClose={() => setIsOpen(false)}
                ariaHideApp={false}
                isOpen={isOpen} className='max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white rounded-md shadow-md outline-none border-[0.5px] border-gray-200' >
                <div className='flex flex-col justify-center items-center h-[100%]'>
                    {selectedFile ? (<img onClick={() => filePickerRef?.current?.click()} src={imageFileUrl} alt='selected Imaage' className={`${isIMageUploading && ' animate-pulse'}  w-full max-h-[250px] object-cover cursor-pointer`} />) :
                        (<HiCamera onClick={() => filePickerRef?.current?.click()} className='text-5xl text-gray-400 cursor-pointer' />)}
                    <input hidden ref={filePickerRef} type="file" accept='image/*' name="image" onChange={addImageToPost} />
                </div>
                <input type="text" maxLength={150} placeholder='Please Enter your Caption...' className='m-4 active:border-none border-none text-center w-full focus:ring-0 outline-none' />
                <button className='w-full bg-red-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100'>Upload Post</button>
                <AiOutlineClose className='cursor-pointer absolute top-2 right-2 hover:text-red-600 transition duration-300' onClick={() => setIsOpen(false)} />
            </Modal>)}
        </div>
    )
} 
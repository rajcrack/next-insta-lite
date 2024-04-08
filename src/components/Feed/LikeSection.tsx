"use client";
import { collection, deleteDoc, doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { app } from '@/firebase';

export default function LikeSection({ id }: { id: string }) {
    const { data: session } = useSession();
    const [hasLiked, setHasLiked] = useState(false);
    const [likes, setLikes] = useState<any>([]);

    const db = getFirestore(app);
    useEffect(() => {
        onSnapshot(
            collection(db, 'posts', id, 'likes'), (snapshot) => {
                setLikes(snapshot.docs);
            }
        );



    }, [db]);
    useEffect(() => {
        let user: any = session?.user;
        if (likes.findIndex((like: any) => like.id === user?.uid) !== -1) {
            setHasLiked(true);
        }
        else {
            setHasLiked(false);
        }
    }, [likes]);

    const changeLike = async () => {
        let user: any = session?.user;
        if (hasLiked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', user?.uid));
        }
        else {
            await setDoc(doc(db, 'posts', id, 'likes', user?.uid), {
                username: user.username,
            });
        }
    }

    return (


        <div>{
            session && (
                <div className="flex border-t border-gray-100 px-4 pt-4">
                    <div className="flex items-center ">
                        {hasLiked ?
                            (<HiHeart onClick={changeLike} className="text-red-500 cursor-pointer text-3xl hover:scale-125 transition-transform duration-200 ease-out" />)
                            :
                            (<HiOutlineHeart onClick={changeLike} className="cursor-pointer text-3xl hover:scale-125 transition-transform duration-200 ease-out" />)
                        }
                        <p className="text-gray-500">&nbsp; {likes.length} {likes.length <= 1 ? 'like' : 'likes'}</p>
                    </div>
                </div>
            )
        }</div>
    )
}

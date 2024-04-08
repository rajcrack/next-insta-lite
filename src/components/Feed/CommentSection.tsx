"use client";

import { app } from "@/firebase";
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import Moment from "react-moment";





export default function CommentSection({ id }: { id: string }) {
    const { data: session } = useSession();
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState<any>([]);

    const db = getFirestore(app);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let user: any = session?.user;
        const commentToPost = comment;
        setComment('');
        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToPost,
            username: user?.username,
            userImage: user?.image,
            timeStamp: serverTimestamp()
        });

    }


    useEffect(() => {
        onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timeStamp', 'desc')), (snapshot) => {
            setCommentList(snapshot.docs);
        });

    }, [db]);



    return (
        <div>
            {
                commentList.length > 0 && (
                    <div className="mx-10 max-h-[127px] overflow-y-scroll">
                        {
                            commentList.map((comm: any) => (<div className="flex items-center space-x-2 mb-2 justify-between" key={comm.id}>
                                <img src={comm.data().userImage} alt="user Image" className="h-7 rounded-full object-cover  border p-[2px]" />
                                <p className="text-sm flex-1 truncate"><span className="font-boldn text-gray-700">{comm.data().username}</span>{' '}{comm.data().comment}</p>
                                <Moment fromNow className="text-xs text-gray-400 pr-3">
                                    {comm.data().timeStamp?.toDate()}
                                </Moment>
                            </div>))

                        }
                    </div>
                )
            }


            {
                session && (<>
                    <form onSubmit={handleSubmit} className="flex items-center p-4 gap-2">

                        <img src={session?.user?.image ?? ""} alt="User Image"
                            className="h-10 w-10 border rounded-full p-[4px] object-cover"
                        />
                        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a Comment..." className="flex-1 border-none focus:ring-0 outline-none" />
                        <button disabled={!comment.trim()} type="submit" className={`text-blue-400 disabled:cursor-not-allowed disabled:text-gray-400`}>Post</button>
                    </form>
                </>)
            }



        </div>
    )
}

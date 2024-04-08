import React from 'react'
import { app } from '@/firebase';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import Post from './Post';

export default async function Posts() {
    const db = getFirestore(app);
    const q = query(collection(db, 'posts'), orderBy('timeStamp', 'desc'));
    const querySnapshot = await getDocs(q);
    let postList: any = [];
    querySnapshot.forEach((doc) => {
        postList.push({ id: doc.id, ...doc.data() });
    });
    return (
        <div>
            {postList.map((data: any) => (<Post key={data.id} post={data} />))}
        </div>
    )
}

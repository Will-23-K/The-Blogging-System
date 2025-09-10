import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import PostCard from '../components/PostCard';

export default function Home(){
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    api.get('/posts')
      .then(res => setPosts(res.data.data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div>
      <h2>Feed</h2>
      {posts.map(p => <PostCard key={p._id} post={p} />)}
    </div>
  );
}

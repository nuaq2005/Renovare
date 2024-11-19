import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Post from '../components/Post';
import Comment from '../components/Comment';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
          const { data} = await supabase
            .from('Posts')
            .select()
            .eq('id', id)
            .single();

            setPost(data);
        };
        fetchPost().catch(console.error);
      }, [id]);

      useEffect(() => {
      const fetchComments = async () => {
        const { data } = await supabase
          .from('Comments')
          .select()
          .eq('post_id', id)
          .order('created_at', { ascending: true });
          
          setComments(data || []);
      }
      fetchComments().catch(console.error);
    }, [id]);

  return (
    <div className="post-detail">
        {post ? (
        <div className = 'post-info'>
          <Post 
          id={post.id}
          title={post.title}
          created_at={post.created_at}
          image_url={post.image_url}
          content={post.content}
          upvotes={post.upvotes}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className='postBtns'>
      <Link to={`/edit-post/${id}`} style={{textDecoration:'none'}} className='btn' id='editBtn'> Edit </Link>
      <Link to={`/post/${id}/create-comment`} style={{textDecoration:'none'}} className='btn'> Add A Comment 💭 </Link>
      </div>

      <div className='comment-section'>
            {comments.map((comment) => (
                <Comment 
                    key={comment.id}
                    id={comment.id}
                    title={comment.title}
                    created_at={comment.created_at}
                    content={comment.content}
                    image_url={comment.image_url}
                    upvotes={comment.upvotes}
                />
            ))}
      </div>
    </div>
  );
}

export default PostDetail;
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {supabase} from '../client'

const EditPost = () => {

    const {id} = useParams();
    const [post, setPost] = useState({id: null, title: "", content: "", image_url: "", upvotes: ""});

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single();
                setPost(data); 
        };
        fetchPost().catch(console.error);
    }, [id]);
    
    const updatePost = async (event) => {
        event.preventDefault();

        await supabase
          .from('Posts')
          .update({
                title: post.title,
                content: post.content,
                image_url: post.image_url,
                upvotes: post.upvotes
            })
          .eq('id', id);
      
        window.location = `/post/${id}`;
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const deletePost = async (event) => {
        event.preventDefault();

        await supabase
          .from('Posts')
          .delete()
          .eq('id', id);
      
        window.location = "/";
    }

    return (
        <div> 
        <label htmlFor="title">Title</label> <br />
        <input type="text" id="title" name='title' className = "input-box" value = {post.title} onChange={handleChange} /><br />
        <br/>
            
        <label htmlFor="content">Content</label> <br />
        <textarea id="content" name="content"  className="input-box"  value={post.content}  onChange={handleChange}/><br />
        <br />
        
        <label htmlFor="image_url">Image URL</label> <br />
        <textarea id="image_url" name="image_url" className="input-box" value={post.image_url} onChange={handleChange} rows="2" cols="50"/><br />
        <br />
 
            <input className="postBtn rightBtn btn" type="submit" value="Submit" onClick={updatePost} />
            <button className="postBtn btn" onClick={deletePost}>Delete </button>
        

        </div>
    )
}

export default EditPost;
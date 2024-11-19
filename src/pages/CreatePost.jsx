import {useState} from 'react';
import {supabase} from '../client';

const CreatePost = () => {

    const [post, setPost] = useState({ title: "", content: "", image_url: "", upvotes: 0});

    const createPost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .insert({
            title: post.title, 
            content: post.content, 
            image_url: post.image_url, 
            upvotes: post.upvotes})
          .select();
          
          window.location = `/`; 
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
    

    return (
        <div>
            <label htmlFor="title">Title</label> <br />
            <input type="text" id="title" name="title" className = "input-box" value = {post.title} onChange={handleChange} /><br />
            <br/>

            <label htmlFor="content">Content</label> <br />
            <textarea id="content" name="content"  className="input-box"  value={post.content}  onChange={handleChange}/><br />
            <br />
            
            <label htmlFor="image_url">Image URL</label> <br />
            <textarea id="image_url" name="image_url" className="input-box" value={post.image_url} onChange={handleChange} rows="2" cols="50"/><br />
            <br />
                
            <input type="submit" value="Submit" className='btn' onClick= {createPost} />
        </div>
    )
}

export default CreatePost;
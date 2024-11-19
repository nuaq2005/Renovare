import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {supabase} from '../client'

const EditComment = () => {

    const {id} = useParams();
    const [comment, setComment] = useState({id: null, post_id: "", content: "", upvotes: ""});

    useEffect(() => {
        const fetchComment = async () => {
            const { data, error } = await supabase
                .from('Comments')
                .select('*')
                .eq('id', id)
                .single();
                setComment(data); 
        };
        fetchComment().catch(console.error);
    }, [id]);
    
    const updateComment = async (event) => {
        event.preventDefault();

        await supabase
          .from('Comments')
          .update({
                post_id: comment.post_id,
                content: comment.content,
                upvotes: comment.upvotes
            })
          .eq('id', id);
      
        window.location = `/post/${comment.post_id}`;
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setComment( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const deleteComment = async (event) => {
        event.preventDefault();

        await supabase
          .from('Comments')
          .delete()
          .eq('id', id);
      
        window.location = `/post/${comment.post_id}`;
    }

    return (        
    <div>   
            <label htmlFor="content">Content</label> <br />
            <textarea id="content" name="content"  className="input-box"  value={comment.content}  onChange={handleChange}/><br />
            <br />
            
            <label htmlFor="image_url">Image URL</label> <br />
            <textarea id="image_url" name="image_url" className="input-box" value={comment.image_url} onChange={handleChange} rows="2" cols="50"/><br />
            <br />

        <input className = "btn rightBtn" type="submit" value="Submit" onClick={updateComment} />
        <button className="deleteButton btn" onClick={deleteComment}>Delete</button>
    </div>
    )
}

export default EditComment;
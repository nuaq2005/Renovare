import {useState} from "react";
import { supabase } from "../client";
import './Post.css';

const Post = (props) =>  {
    const id = props.id;

    const date = new Date(props.created_at);
    const formattedDate = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });

    const [upvotes, setUpvotes] = useState(props.upvotes);

    const handleClick = async (event) => {
        event.preventDefault();

        const updatedUpvote = upvotes + 1;

        const { error } = await supabase
            .from('Posts')
            .update({ upvotes: updatedUpvote })
            .eq('id', id);

        if (error) {
            console.error("Error updating upvotes:", error);
        } else {
            setUpvotes(updatedUpvote);
        }
    };

    return (
        <div className= 'post-card'>
            <h2>{props.title}</h2>
            <h6 className = "time"> {formattedDate} </h6>
            {props.image_url && <img src={props.image_url} alt="Post" className="post-image"/>}
            <h3 className="content">{props.content}</h3>
            <div className="post-footer">
                <button className="upvotesBtn btn" onClick ={handleClick}> ♥ </button>
                <span className="upvotes">{upvotes}</span>
            </div>
        </div>
    );
  };

  export default Post;
import {useState} from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import './Comment.css';

const Comment = (props) =>  {
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

        // Increment upvotes locally
        const updatedUpvote = upvotes + 1;

        // Update the database
        const { error } = await supabase
            .from('Comments')
            .update({ upvotes: updatedUpvote })
            .eq('id', id);

        if (error) {
            console.error("Error updating upvotes:", error);
        } else {
            // Update the state to re-render the UI
            setUpvotes(updatedUpvote);
        }
    };

    return (
        <div className= 'comment-card'>
            <h2>{props.title}</h2>
            <h6 className = "time"> {formattedDate} </h6>
            <h3 className="content">{props.content}</h3>
            {props.image_url && <img src={props.image_url} alt="Post" className="comment-image"/>}
            <div className="comment-footer">
                <Link to={`/edit-comment/${id}`} className="commentBtn"> ✏️ </Link>
                <button className="upvotesBtn" onClick ={handleClick}> ♥ </button>
                <span className="upvotes">{upvotes}</span>
            </div>
        </div>
    );
  };

  export default Comment;
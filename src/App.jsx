import { useState } from 'react'
import { useEffect } from 'react'
import { supabase } from './client'
import { Link } from 'react-router-dom'
import Post from './components/Post'
import './App.css'

function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
        const {data} = await supabase
        .from('Posts')
        .select()
        .order('created_at', { ascending: true })
        
        // set state of posts
        setPosts(data);
        setFilteredPosts(data);
    }
    fetchPosts().catch(console.error);
}, []);

const handleChange = async (event) => {
  const {value} = event.target;
  const sortBy ={
    Newest: {column:'created_at' , ascending: false},
    Oldest: {column: 'created_at', ascending: true},
    "Most Upvotes": {column: 'upvotes', ascending: false},
    "Least Upvotes": {column: 'upvotes', ascending: true},
  }
   const {column, ascending} = sortBy[value];

  const {data} = await supabase
    .from('Posts')
    .select()
    .order(column, {ascending});

  setFilteredPosts(data);
}

const filterByName = (inputStr) =>{
  const query = inputStr.toLowerCase();

  if(query !== ''){
    const filtered = posts.filter((post) => 
      post.title.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  }else{
    setFilteredPosts(posts);
  }
};

  return (
   <div className="home-page"> 

   <div className='header'> 
    <h1 className="web-name"> Renovare </h1>
    <p className='description'> Make your rental feel more like a forever home </p>
   </div>

<div>
  <label> Search: </label>
  <input type="text"  placeholder="Search for a post" className = 'filter-by' onChange={(inputStr) => filterByName(inputStr.target.value)} />

    <label> Sort By: </label>
    <select name='filter' className = 'filter-by' onChange = {handleChange}>
      <option> </option>
      <option> Newest </option>
      <option> Oldest </option>
      <option> Most Upvotes </option>
      <option> Least Upvotes </option>
    </select>
  </div>

  <div className="all-posts">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id}>
              <Link to={`/post/${post.id}`} style={{textDecoration:'none'}}>
                <Post
                  id={post.id}
                  title={post.title}
                  created_at={post.created_at}
                  image_url={post.image_url}
                  content={post.content}
                  upvotes={post.upvotes}
                />
              </Link>
            </div>
          ))
        ) : (
          <h2>{'Start a Conversation!'}</h2>
        )}
        </div>
  </div> 

  )
}

export default App

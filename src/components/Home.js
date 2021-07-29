import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import PostCard from './PostCard';

function Home() {

    const [posts, setPosts] = useState([]);
    const [deleteP, setDelete] = useState(false);
    const [loader, setLoader] = useState(true);
    const history = useHistory();
    const goToAddPost = () => history.push('/add-post');
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;

    // console.log(posts);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/getPosts`).then(res => {
            setPosts(res.data.posts);
            setLoader(false)
        }).catch(err => {
            alert(`${err.response.data.message}`);
        })
    },[deleteP])

    
    const deletePost = (id) => {
        axios.delete(`${process.env.REACT_APP_API}/deletePost/${id}`).then(res => {
            setDelete(!deleteP);
        }).catch(err => {
            alert(`${err.response.data.message}`);
        })
    }


   
    return (
        <div>
            {loader ? <div className="text-center mt-4">
                <p className="spinner-border" role="status">
                </p>
            </div> : ''}
            <div className="container">
            <div className="row justify-content-end mt-4 ml-5">
                <div className="col-4">
                    <button onClick={goToAddPost} className="btn btn-success">Add New Post</button>
                </div>
            </div>
            <div>
                <PostCard posts={posts} truncate={true} delete={deletePost}/>
            </div>
        </div>
        </div>
      
    )
}

export default Home

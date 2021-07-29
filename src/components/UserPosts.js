import { useEffect,useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from './PostCard';
function UserPosts() {

    const [posts, setPosts] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/getUserPosts/${id}`).then(res => {
            setPosts(res.data.posts);
        }).catch(err => {
            alert(`${err.response.data.message}`);
        })
    }, [id])
    
    const deletePost = (id) => {
        axios.delete(`${process.env.REACT_APP_API}/${id}`).then(res => {
            history.push('/home');
        }).catch(err => {
            alert(`${err.response.data.message}`);
        })
    }

    return (
        <div className="container">
            <div>
                <PostCard truncate={true} delete={deletePost} posts={posts}/>
            </div>
        </div>
        
    )
}

export default UserPosts

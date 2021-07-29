import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,useHistory } from "react-router-dom"
import PostCard from "./PostCard";

function SinglePost() {

    const [Post,setPosts] = useState([]);
    const { id } = useParams();
    const history = useHistory();
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/getPost/${id}`).then(res => {
                let Post = [];
                Post.push(res.data)
                setPosts(Post);
            }).catch(err => {
                alert(`${err.response.data.message}`);
        })
    }, [id])

    const deletePost = (id) => {
        axios.delete(`${process.env.REACT_APP_API}/deletePost/${id}`).then(res => {
            history.push('/home');
        }).catch(err => {
            alert(`${err.response.data.message}`);
        })
    }

    return (
        <div className="container">
            <PostCard posts={Post} truncate={false} delete={deletePost}/>
        </div>
    )
}

export default SinglePost;

import profile from '../assets/profile.png'
import { useHistory } from 'react-router-dom'
import moment from 'moment';

function PostCard(props) {

    const history = useHistory();
    const goToEditPost = (id) => history.push(`/edit-post/${id}`);
    const goToUserPosts = (id) => history.push(`/user-posts/${id}`);
    const goToPost = (id) => history.push(`/post/${id}`)
    const userId = localStorage.getItem('userId');
    return (
        <div>
            {props.posts.map((data) => {
                return (
                    <div key={data._id} style={{ cursor: 'pointer' }} className="row justify-content-center">
                    <div className="col-8">
                        <div className="card my-4 pe-auto">
                            <div className="card-body">
                                <div className="header d-flex">
                                    <img src={profile} alt="User-Profile" width="40" />
                                        <h6 onClick={() => goToUserPosts(data.author.id)} className="mt-2 ml-3">{data.author.username}</h6>
                                </div>
                                <div className="post mt-3">
                                    <h6 className="title">{data.title}</h6>
                                    <p  onClick={() => goToPost(data._id)} className={props.truncate ? 'text-truncate': ''}>{data.postBody}</p>
                                </div> 
                                <div className="d-flex justify-content-between">
                                    <div className="btns">
                                            { userId === data.author.id ? <button onClick={() => goToEditPost(data._id)} className="btn btn-primary">Edit</button> : ''}
                                            { userId === data.author.id ? <button onClick={() => props.delete(data._id)} className="btn btn-danger ml-3">Delete</button> : ''}
                                    </div>
                                    <div className="pt-2">
                                        {moment(data.updatedAt).format('LLLL')}    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
                )
            })}
        </div>
    )
}

export default PostCard
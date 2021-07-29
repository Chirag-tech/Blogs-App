import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
function AddPost() {

    axios.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('userToken')}`;
    let mode = 'Add';
    const history = useHistory();
    const { register, handleSubmit, reset, setValue } = useForm();
    let { id } = useParams();
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    
    
    if (id) {
            mode = "Edit";
            axios.get(`${process.env.REACT_APP_API}/getPost/${id}`).then(res => {
                setValue('title', res.data.title);
                setValue('postBody', res.data.postBody);
            }).catch(err => {
                alert(`${err.response.data.message}`);
            });
     }

    const create = (data) => {

        axios.post(`${process.env.REACT_APP_API}/createPost`, { ...data,author: { id:userId, username:userName} }).then(res => {
            reset();
            history.push('/home');
        }).catch(err => {
            alert(`${err.response.data.message}`);
        })
    
    }

    const update = (data) => {
        axios.put(`${process.env.REACT_APP_API}/updatePost/${id}`,data).then(res => {
            reset();
            history.push('/home');
        }).catch(err => {
            alert(`${err.response.data.message}`);
        })
    }

    return (
        <form onSubmit={handleSubmit(id ? update : create)}>
            <div className="d-flex justify-content-center mt-5 container">
                <div  className="card w-50">
                    <div className="card-body">
                        <h6>{mode} New Post</h6>
                        <input required type="text" {...register('title')} className="form-control mt-3"  placeholder="Title"/>
                        <textarea required className="form-control mt-4"  rows="5" {...register('postBody')}  placeholder="Post"></textarea>
                        <button type="submit" className="btn btn-info btn-block mt-4">{mode} Post</button>
                    </div>
                </div>  
           
            </div>
        </form>
            
    )
}

export default AddPost

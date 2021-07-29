import axios from 'axios';
import { useState } from 'react'
import { useHistory } from "react-router-dom";
function Login() {

    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signup, setSignup] = useState(true);
    const [routeName,setRouteName] = useState('login')

    const print = (e) => {
        e.preventDefault();
        const payload = {
            username,
            password
        }
        axios.post(`${process.env.REACT_APP_API}/${routeName}`, payload).then(res => {
            localStorage.clear();
            localStorage.setItem('userToken', res.data.token);
            localStorage.setItem('userId', res.data.id);
            localStorage.setItem('userName', res.data.username);
            history.push('/home');
        }).catch(err => {
            alert(`${err.response.data.message}`);
        })
    } 
    return(
        <div>
            <div className="container w-25">
                <h1 className="text-center my-4">{routeName}</h1>
                <form  onSubmit={print}>
                    <div className="form-group">
                        <input  value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control"   placeholder="Enter Username" required/>
                    </div>
                    <div className="form-group">
                        <input  value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control"  placeholder="Enter Password" required/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">{routeName}</button>
                </form>
                {signup ? <p onClick={() => {  setSignup(false); setRouteName('signup') }} style={{ cursor: 'pointer' }} className="text-center pt-3">Don't have a account ? Signup </p> : ''}
                {!signup ? <p onClick={() => { setSignup(true); setRouteName('login') }} style={{ cursor: 'pointer' }}   className="text-center pt-3" >Already have a account ? Login</p> : ''}
            </div>
        </div>
    )
}

export default Login
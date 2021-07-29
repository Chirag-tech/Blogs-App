import { useHistory } from "react-router-dom";

function NavBar() {

    const history = useHistory();
    const logout = () => {
        localStorage.clear();
        history.push('/');
    }
    const goToHome = () => history.push('/home')

    const userId = localStorage.getItem('userId');
    

    return (
        <div>
           <nav className="navbar navbar-dark bg-dark">
                <span style={{cursor:'pointer'}} onClick={goToHome} className="navbar-brand">Blogs</span>
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            { userId ? <span className="nav-link" style={{ cursor: 'pointer' }} onClick={logout} >Logout</span> : ''}
                        </li>
                    </ul>
            </nav>
       </div>
        
    )
}

export default NavBar

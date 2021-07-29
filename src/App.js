import Login from "./components/Login";
import Home from "./components/Home";
import NavBar from "./components/NavBar"
import AddPost from "./components/AddPost";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import UserPosts from "./components/UserPosts";
import Auth from "./Services/Auth";
import SinglePost from "./components/SinglePost";


function App() {
    
    return (
        <Router>
            <Switch>
                <PrivateRoute path="/home">
                   <NavBar/>
                   <Home/>
                </PrivateRoute>
                <PrivateRoute path="/add-post">
                    <NavBar/>
                    <AddPost />
                </PrivateRoute>
                <PrivateRoute path="/edit-post/:id">
                   <NavBar/>
                   <AddPost />
                </PrivateRoute>
                <PrivateRoute path="/user-posts/:id">
                    <NavBar/>
                    <UserPosts/>
                </PrivateRoute>
                <PrivateRoute path="/post/:id">
                    <NavBar />
                    <SinglePost/>
                </PrivateRoute>
                <Route path="/">
                    <NavBar/>
                    <Login/>
                </Route>
            </Switch>
        </Router>
       
   )
}

function PrivateRoute({ children, ...rest }) {
    return (
      <Route {...rest} render={({ location }) => {
        return Auth.isValidated() === true
          ? children
          : <Redirect to={{
              pathname: '/',
              state: { from: location }
            }}
   />
      }} />
    )
}

export default App;
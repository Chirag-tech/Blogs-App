
import jwtDecode from "jwt-decode";
const Auth = {
 
    isValidated: () => {
        let token = localStorage.getItem('userToken');
        if (token) {
            let decodedToken = jwtDecode(token);
            let currentDate = new Date();
        
            // JWT exp is in seconds
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                localStorage.clear();
                return false;
            } else {
                return true;
            }
        }
        return false;
    }
}

export default Auth

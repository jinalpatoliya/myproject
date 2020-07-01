import jwt_decode from 'jwt-decode';
import { Cookies } from 'react-cookie';
import { Router } from 'next/router';

const cookies = new Cookies();

export const Auth=({req,res})=>{
    let token, decoded = null;
    if(req) {
        if(req.headers.cookie){
            token=req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");        
        }
    }  
    else {
        token = cookies.get('token');
    }

    if(!token){        
        if(res){
            res.redirect('/login')
        }
        else{
            Router.push("/login")
        }
    }  

    if(token) {
        decoded = jwt_decode(token);
    }      
               
    return{
        decoded:decoded        
    }  
}
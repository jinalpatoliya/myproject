import isEmpty from "./is-empty";
import jwt_decode from "jwt-decode";
import { Cookies } from 'react-cookie';
import { Router } from 'next/router';

const cookies = new Cookies();

export const getTokeAndCheckIsExpired = (req) => {
  const token = getToken(req);
  const token_decode = decodeToken(token);
  if (isEmpty(token_decode)) {
    return false;
  }
   else {
    return checkTokenExpiration(token_decode);
  }
  
};
export const removeToken = (token) => {
    cookies.remove('token', { path: '/' });
}
const checkTokenExpiration = (token) => {
   let dateNow = new Date();
  if (token.exp < dateNow.getTime() / 1000) {
    return true;
  }
  return false;
};

export const decodeToken = (token) => {
  if (token) return jwt_decode(token);
  return {};
};

const getToken = (req) => {
  let token = null;
  if (req) {
    if (req.headers.cookie) {
      token = req.headers.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
    }
  } else {
    token = cookies.get("token");
  }

  if (isEmpty(token)) {
    return null;
  } else {
    return token;
  }
};


export const checkAuthentication=({req,res})=>{
    
    const token = getToken(req)
    if(!token){        
        if(res){
            res.redirect('/login')
        }
        else{
            Router.push("/login")
        }
    }  

    const decode = decodeToken(token)
               
    return{
        decoded:decode        
    }  
}

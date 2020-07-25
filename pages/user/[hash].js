import Axios from "axios";

export default async function ActivateUser(hash){
   
    if(!hash){
        return res.status(401).json({message : 'Cannot Validate an User.'})
    }
    const response = await Axios.get(`http://localhost:3000/api/v1/user/${hash}`);
    if(response.status<=400){
        return res.status(401).json({message:'Cannot Validate an User.'})
    }
    else{
        res.writeHead(307,{Location:'/users/activated'});
        res.end();
    }
}

ActivateUser.getInitialProps = async(req)=>{   
    const hash = req.query;
    console.log("Has Value",hash)    
    return{
        hash
    }
}
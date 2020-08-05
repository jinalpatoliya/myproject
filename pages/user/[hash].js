import Axios from "axios";
import Layout from "../../components/Layout/Layout";

export default async function ActivateUser(hash){
    if(!hash){
        return <Layout><div><h1>Something Is Wrong.</h1></div></Layout>
    }
    else{
        const response = await Axios.get(`/user/${hash}`);
        if(response){      
        return(
            <Layout>
            <h1 className="text-center">
                You have been succesfully activated.You can login Now !
            </h1>
        </Layout>
    )
    }
    // if(!hash){
    //     return res.status(401).json({message : 'Cannot Validate an User.'})
    // }
    // const response = await Axios.get(`/user/${hash}`);
    // if(response.status<=400){
    //     return res.status(401).json({message:'Cannot Validate an User.'})
    // }
    // else{
    //     res.writeHead(307,{Location:'/users/activated'});
    //     res.end();
    // }
}

ActivateUser.getInitialProps = async({req,res})=>{   
    const hash = req.query;
    console.log("Has Value",hash)    
    return{
        hash
    }
}
// import Axios from "axios";

// export default async function activateUser(req, res) {
//     const hash = req.query.hash;
//     if (!hash) {
//       return res.status(401).json({message: 'Cannot Validate an User!'})
//     }
  
//     // const response = await Axios.get(`http://localhost:3000/api/v1/user/${hash}`);;
//     // if (response.status >= 400) {
//         if(hash){
//       return res.status(401).json({message: 'Cannot Validate an User!'})
//     } else {
//       res.writeHead(307, { Location: '/users/activated' });
//       res.end();
//     }
//   }


import Axios from "axios";
import Layout from "../../components/Layout/Layout";

const ActivateUser = async ({hash}) => {
    console.log("********************")
    console.log("hash Val:",hash)
    console.log("********************")
    if(!hash){
        return <Layout><div><h1>Something Is Wrong.</h1></div></Layout>
    }
    else{
        const response = await Axios.get(`http://localhost:3000/api/v1/user/${hash}`);
        console.log("********************")
        console.log("Response Val:",response)
        console.log("********************")
        if(response){      
        return(
            <Layout>
            <h1 className="text-center">
                You have been succesfully activated.You can login Now !
            </h1>
        </Layout>
        )
        }
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

ActivateUser.getInitialProps = ({query}) => {
    // const hash = req.query;
    const { hash } = query;
    console.log("********************")
    console.log("Has Value",hash);
    console.log("********************")
    return {hash}
  }

  export default  ActivateUser;
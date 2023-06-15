import jwt from 'jsonwebtoken';

const auth = (req,res, next) => {
    try{
      const token = req.headers.authorization.split(" ")[1]; // this token is from the frontend and is used to verify the user
      const isCustomAuth = token.length < 500; // if the token is less than 500, then it is a custom token, else it is a google token
      let decodedData;

      if(token && isCustomAuth){
        decodedData = jwt.verify(token, "test"); // has to be same secret and token
        req.userId = decodedData?.id;
      } // if the token is a custom token, then it will be decoded and the id will be set to the request
      else{
        decodedData = jwt.decode(token); // if the token is a google token, then it will be decoded and the sub will be set to the request

        req.userId = decodedData?.sub; // sub is the google name for id
      }
      next(); // next is used to move on to the next middleware
    }

    catch(error){
        console.log(error)
    }

    
}

export default auth;
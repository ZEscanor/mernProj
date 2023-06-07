Lifestyle is a full stack web application that allows users to create and store their memories in one place. It allows users to easily customize posts, comment/like on other posts, send private messages, and view all of their memories in one organized place.

 
 ** This app is a WIP **
 




#To Begin Click the Login button and make an account, Or click the Demo button

![Screenshot (37)](https://github.com/ZEscanor/mernProj/assets/69213231/ced86e12-762d-40ac-86ed-de71f6b0d991)


#Then  you will be able to make and search for posts by tag or name*
![Screenshot (26)](https://user-images.githubusercontent.com/69213231/219229034-bcf8c17f-b52d-4ca3-81a5-43092ec734c1.png)

#Additionally you can click the picture of the posts to see more details and leave a comment

![Screenshot (28)](https://user-images.githubusercontent.com/69213231/219230098-e1cf7c17-ef63-4638-b538-9999de90d9ad.png)

#Click on the User Avatar to check Available Users and send them Messages
![Screenshot (38)](https://github.com/ZEscanor/mernProj/assets/69213231/5372a19e-b539-4e16-bc89-4dc99d740c9b)



   
   
   
   
   
   # Full list of features Users will be able to do:
    Create a new user account or Login using Google OAUTH or on the App
    Logout of the user account(Automatically logs out after 1hr)
    Create and upload posts to the database
    Clear Forms
    Edit/Delete posts that you created
    Search Bar for related posts
    Like Posts from other users
    Inspecting Posts for more information and display other relevant posts.
    Pagination (Every 9th posts will be moved to another page)
    Search Posts by tags or name keywords
    Write comments on others posts.
    Messaging other users
    View role information of other users.


 

         
      


# Relevant Endpoints Frontend 
  https://memoriesmern.vercel.app//posts     ---Home Page <br/>
  https://memoriesmern.vercel.app//auth           ---Login Page


# Relevant Endpoint API
   Full API endpoint -- https://mern-proj-api.vercel.app/ <br/>
   https://mern-proj-api.vercel.app/posts ----------- Return all posts <br/>
  https://mern-proj-api.vercel.app/user ------return all users (hashed passwords for security and demo purposes)<br/>
  https://mern-proj-api.vercel.app/user/:id ----  return specific user with specified id<br/>

  
  *Additional Notes*
  Editing and Deleting can only be done by the user who made the post (later the admins will be able to delete as well )<br/>


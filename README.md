# A project which highlights the use of the MERN stack

# This app allows user to create and store memories like a journal and share them with each other.
 

![Screenshot (26)](https://user-images.githubusercontent.com/69213231/219229034-bcf8c17f-b52d-4ca3-81a5-43092ec734c1.png)


#To Begin Click the Login button and make an account, you will be directed to the login/signup page


![Screenshot (27)](https://user-images.githubusercontent.com/69213231/219229468-62524c53-34fd-4bf1-98e1-51a9f50a5457.png)

#Then like the first picture you will be able to make and search for posts by tag or name*

#Additionally you can click the picture of the posts to see more details and leave a comment

![Screenshot (28)](https://user-images.githubusercontent.com/69213231/219230098-e1cf7c17-ef63-4638-b538-9999de90d9ad.png)


   
   
   
   
   
   # Full list of features Users will be able to do:
    Create a new user account or Login using Google OAUTH
    Logout of the user account(Automatically logs out after 1hr)
    Create and upload posts to the database
    Clear Forms
    Edit posts that you created
    Delete posts that you created
    View info and related posts
    Like Posts
    Search Posts by tags or name keywords
    (If more than 8 posts exists on a page users will be able to navigate to another page using pagination)
    Write comments on others posts.
     Setting user Privilages (Admin roles/moderation) (Users on account creation are now assigned admin or user roles
       )


    # # Features coming soon:
       Lookup users by their profile name and if the user is logged in allow user to edit personal data (partially done)
       Allow users to PM other users
       Admin Dashboard and commands
      Seperate Time management and game component.
       

         
      


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
  Liking a post only requires a person to be logged in, you can only like a singular post 1 time

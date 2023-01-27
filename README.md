# A project which highlights the use of the MERN stack

# This app allows user to create and store memories like a journal and share them with each other.

   # Users will be able to:
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
       Lookup users by their profile name and if the user is logged in allow user to edit personal data (partially done on api)
       Allow users to PM other users
       Better Feed and a User ToolBar.
       


      #Low prio 
         Darkmode
         ToolBar Help Messages
         
      


# Relevant Endpoints Frontend =
  /posts Home Page 
  /auth Login Page


# Relevant Endpoint API
   /posts Return all posts
   /user return all users (hashed passwords for security and demo purposes)
   /user/:id return specific user with specified id

  

  Clicking The Top of A picture directs it to the specific post to comment
  Editing and Deleting can only be done by the user who made the post (will incorporate admin later)
  Liking a post only requires a person to be logged in
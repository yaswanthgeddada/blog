# Blog Challenge

# MERN TA assessment

- [x] As a writer, I'd like to be able to login into the system so I can have access to my blog posts.
- [x] As a writer, I'd like to be able to logout of the system so other people won't have access to my blog posts using a public terminal.
- [x] As a writer, I'd like to be able to publish blog entries.
- [x] As a writer, I'd like to be able to edit my existing blog entries.
- [x] As a writer, I'd like to be able to delete one of my existing blog entries.
- [x] As a writer, I'd like to be able to log in and out of my blog so that I can edit and delete my own blog entries.
- [x] As a reader, I'd like to be able to view all the entries of a blog, regardless of whether I am logged in, so that I may easily access a writer's content.
- [x] As a reader, I'd like to be able to comment on all the entires of a blog, regardless of whether I am logged in, so that I can spam entries that I don't like with comments, and pick fights with other users.
- [x] As a reader, I'd like for the app to have simple, visually appealing styling so that I have an enjoyable experience reading.

<hr/>

### Installation & Run Instructions

- `git clone` the repo
- `yarn install` in both root and client directories
- `yarn dev` to run both servers

Add .env file with a MongoDB URL to connect to your database, and a JWT secret for the JSON Web Token authentication.

<hr/>

### Dependencies

App uses on the front end:

- axios
- bootstrap & react-bootstrap
- moment
- sweetalert
- react-dom
- react-router-dom

App uses on the back end:

- bcryptjs
- concurrently
- cookie-parser
- dotenv
- express
- jsonwebtoken
- mongodb & mongoose
- nodemon
- passport & passport-jwt

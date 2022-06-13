
import './App.css';
import Post from './Post';
import React, {useState, useEffect} from 'react'
import { db, auth } from './firebase'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {

  const [posts, setPosts] = useState([]); 
  const [open, setOpen] = useState(false); 
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSignIn, setOpenSignIn] = useState(false)
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);



    useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged(( authUser) => {
        if(authUser) {
          //user has logged in
          console.log(authUser);
          setUser(authUser);
        } else {
          //user has logged out
          setUser(null);
        }
      })

      return () => {
        //perform some clean up before the listener refires again
        unsubscribe();
      }

    }, [user, username]);

    useEffect(() => {

      db.collection('posts').onSnapshot(snapshot =>
        {
          setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data()
          })));
        })
      
    }, []);

    const signUp = (event) => {

      event.preventDefault();

      auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
       return authUser.user.updateProfile({
          displayName: username,
        })
      })
      .catch((error) => alert(error.message));

      setOpen(false);

    };  
    
    const signIn = (event) => {
      event.preventDefault();

      auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

      setOpenSignIn(false);

    }; 


  return (
    <div className="app">

     

      

        <Modal
        open={open}
        onClose={() => setOpen(false)}>
         <div style={modalStyle} className={classes.paper}>
           
           <form className='app__signUp'>
           <center>
           <img
            className='app__headerImage' 
            src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'/>
           </center>

           <Input
            placeholder='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

            <Input
            placeholder='email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

           <Input
            placeholder='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            /> 

            <Button onClick={signUp}>SignUp</Button>
           </form>
           
          </div>
      </Modal>


      
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}>
         <div style={modalStyle} className={classes.paper}>
           
           <form className='app__signUp'>
           <center>
           <img
            className='app__headerImage' 
            src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'/>
           </center>

            <Input
            placeholder='email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

           <Input
            placeholder='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            /> 

            <Button onClick={signIn}>SignIn</Button>
           </form>
           
          </div>
      </Modal>

      <div className='app__header'>
        <img
          className='app__headerImage' 
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'/>

        {user ? ( <Button onClick={() => auth.signOut}>Log Out</Button>) : ( 
      
          <div className='app__logincontainer'> 
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
       ) }

      </div>

     <div className='app_posts' >
       <div className='app__postsLeft'>
          {posts.map(({id, post}) => (
            <Post key={id} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          ))}

       </div>
    
        <div className='app__postsright'>
          <InstagramEmbed
            url='https://instagr.am/p/Zw9o4/'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
            />
        </div>
      </div>
     

      {user?.displayName ? (
         <ImageUpload username={user.displayName} />
      ): (
        <h3> Sorry you need Login to Upload</h3>
      )}


     {/* Posts */}
    </div>
  );
}

export default App;

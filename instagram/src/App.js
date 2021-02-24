import React, {useState, useEffect} from 'react';
import './App.css';
import Header from "./component/Header";
import Post from "./component/Post";
import { auth, db } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal"; 
import {Button, Input} from "@material-ui/core";
import ImageUpload from "./ImageUpload";

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
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        // user has logged in ...
        console.log(authUser);
        setUser(authUser);
      }else {
        // user has logged out ...
        setUser(null);
      }
    })
    return () => {
      //perform some cleanup actions
      unsubscribe();
    }
  }, [user, username]);


  // USEEFFECT runs a peice of code based on a specific condition  
  useEffect(() => {
    db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // every time a new post is added, this code fires...
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()})));
    })
  }, []);

// const handleClose = () => {
//   setOpen(false);
// };
  const signUp = (event) => {
      event.preventDefault();
      auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        })
      })
      .catch((error) => alert(error.message))
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }
  return (
    <div className="App">
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ): (
        <h3>Sorry you need to login to upload</h3>
      )}
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
           <div style={modalStyle} className={classes.paper}>
             <form className="app__signup">
              <center>
                <Header />
              </center>
                <Input
                  placeholder="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" onClick={signIn}>sign In</Button>
             </form>
           </div>
      </Modal>
      {/* Header */}
        <Header />
        {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>

        ): (
          <div className="app__loginContainer">
        <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
        <Button onClick={() => setOpen(true)}>Sign up</Button>

          </div>
        )}
      {/* Posts */}
      {posts.map(({id, post}) => (
        <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
      )) 
      };
      {/* <Post 
        username="btissamyaqine" 
        caption="Am btissam" 
        imageUrl="https://image.shutterstock.com/image-photo/beauty-portrait-female-model-natural-260nw-564737908.jpg"/>
      <Post 
        username="IssamELFERKH" 
        caption="WOW it's Work" 
        imageUrl="https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png" />
      <Post 
        username="BlablaBLA" 
        caption="Am Blabla" 
        imageUrl="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg"/> */}

    </div>
  );
}

export default App;

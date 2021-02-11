import React, {useState, useEffect} from 'react';
import './App.css';
import Header from "./component/Header";
import Post from "./component/Post";
import { db } from "./firebase";

function App() {
  const [posts, setPosts] = useState([]);

  // USEEFFECT runs a peice of code based on a specific condition  
  useEffect(() => {
    db.collection("posts").onSnapshot(snapshot => {
      // every time a new post is added, this code fires...
      setPosts(snapshot.docs.map(doc => doc.data()));
    })
  },[]);
  return (
    <div className="App">
      {/* Header */}
        <Header />
      {/* Posts */}
      {posts.map(post => (
        <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
      )) 
      };
      <Post 
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
        imageUrl="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg"/>

    </div>
  );
}

export default App;

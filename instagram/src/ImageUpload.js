import React, {useState} from 'react';
import { Button } from "@material-ui/core";
import { storage, db } from "./firebase";
import firebase from 'firebase';



function Imageupload({username}) {
    const [caption,setCaption] = useState('');
    const [ image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState("");

    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    const handleUpload = () => {
        const upLoadTask = storage.ref(`image/${image.name}`).put(image);
        upLoadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function.....
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100 
                );
                setProgress(progress);
            },
            (error) => {
                //error function ...
                console.log(error);
                alert(error.message);
            },
            () => {
                //complet function ...
                storage
                .ref("image")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    //post image inside db
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url.toString(),
                        username: username
                    });
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                });
            }

        );
    };

    return (
        <div>
            {/* I want to have ..... */}
            {/* Caption input */}
            {/* file picker */}
            {/* post button */}
            <progress value={progress} max="100" />
            <input type="text" placeholder="Enter a caption...." 
                onChange={event => setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default Imageupload

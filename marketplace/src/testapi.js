import { useEffect, useState } from "react"
import smartshopapi from "./smartshopapi"
import 'firebase/storage';
import firebase from "firebase/compat/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/storage/web/upload-files?hl=fr
// se connecter avec firebase lien ci dessus
const firebaseConfig = {
    apiKey: "AIzaSyC_F-_Sq2kRvikMafzcuwHA8l2EVKgm5vQ",
    authDomain: "marketplace-15abf.firebaseapp.com",
    projectId: "marketplace-15abf",
    storageBucket: "marketplace-15abf.appspot.com",
    messagingSenderId: "1031310473653",
    appId: "1:1031310473653:web:06387ff28d817be53ac1fc",
    measurementId: "G-NTZZEGL9WP"
  };
  const firebaseApp = initializeApp(firebaseConfig);

export default function Testapi(){
    const [image, setImage] = useState('');
    let [videoSrc, setVideoSrc] = useState('');
    const storage = getStorage();
    //download file
    const download=()=>{
      const storage=getStorage()
      getDownloadURL(ref(storage, 'gs:/Audio/3421320ea37e4681a419b75f903eee97.mp4'))
      // getDownloadURL(ref(storage, 'gs:/video/logo192.png'))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    const img = document.getElementById('myimg');
    console.log(url)
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
  });  

    }

/**afficher les images depuis firebase */
let [urls,setUrls]=useState('')
const storageRef = ref(storage, 'gs:/video/logo192.png'); // Remplacez 'chemin_de_l_image' par le chemin de l'image dans votre stockage Firebase
getDownloadURL(storageRef)
  .then((url) => {
    // Utilisez l'URL pour afficher l'image dans votre page web
    urls=url
    setUrls(urls)
    console.log(url);
  })
  .catch((error) => {
    // Gérez les erreurs ici
    console.error('Erreur lors de la récupération de l\'URL de téléchargement :', error);
  });

    /** @type {any} */
    const upload=()=>{
    const metadata = {
      contentType: image.type
    };
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'gs:/video/' + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);
    uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  },
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
)
    }




    // const upload = () => {
    //     console.log(image)
    //     // const ref = ref(storage, `/images/${image.name}`)
    //     // const upload = uploadBytes(ref, payload.image);
    //     if (image == null){
    //         console.log('ines')
    //         // return;
    //     }    
    //     // ref.put(image)
    //     //     .on("state_changed", alert("success"), alert);
    // }
 
    return (
        <div className="App">
            <center>
                <input type="file" onChange={(e) => 
                { setImage(e.target.files[0]) }} />
                <button onClick={upload}>Upload</button>
                <div>
                  <img src={urls}/>
                  {/* <img src='img/8.jpg' id="myimg"/> */}
                  
                  <button onClick={download}>download</button>

                  {/* <video controls> */}
                    {/* <video src={videoSrc} controls autoPlay preload playsInline id="myimg"  type="video/mp4">
                    Votre navigateur ne prend pas en charge la balise vidéo.</video> */}
                    <audio controls src={'img/Audio/Alan Cavé - J ai besoin de toi.mp3'} controlsList="nodownload" type="audio/mpeg">
                      {/* <source src="chemin_vers_fichier_audio.mp3" type="audio/mpeg"/> */}
                      Votre navigateur ne prend pas en charge l'élément audio.
                    </audio>
                    {/* <embed src="img/Document/2_CNN.pdf" type="application/pdf" width={'50%'} height={"600px"}/> */}
                    <iframe src="img/Document/2_CNN.pdf#toolbar=1" sandbox="allow-same-origin" type="application/pdf" width={'50%'} height={"600px"}></iframe>
                  {/* </video> */}
                </div>
            </center>
        </div>
    );
}
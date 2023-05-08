//@ts-nocheck
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import {getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDhsjEQsFBNm3FQpjPwbUH7Ukv7iOt49RU",
    authDomain: "transcriptable-c22f9.firebaseapp.com",
    projectId: "transcriptable-c22f9",
    storageBucket: "transcriptable-c22f9.appspot.com",
    messagingSenderId: "794990927735",
    appId: "1:794990927735:web:f76f1d7c9cb3c4d8478b72",
    measurementId: "G-QCBK3M2PCZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app)

const db = getFirestore(app);
//connectFirestoreEmulator(db, 'localhost', 8080);

export const uploadTranscription = (filename, file, downloadToken: string, progressCallback) => {
    console.log("==== file name is ====", filename)
    return  new Promise((resolve, reject) => {
    const uploadTask =  uploadBytesResumable(ref(storage,filename), file, {
        customMetadata: {
            downloadToken: downloadToken
        }
    })
    uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            progressCallback(progress)
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
          reject(error)
            // Handle unsuccessful uploads
        },
        (response) => {
            console.log("==== response is ====", uploadTask.snapshot.metadata)
            resolve(uploadTask.snapshot)
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            // /*getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            //     console.log('File available at', downloadURL);
            //     resolve(downloadURL)
            // });*/
        }
    );
    })
}

export const auth =getAuth(app);





export { storage, db };
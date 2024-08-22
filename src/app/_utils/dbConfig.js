import { initializeApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: 'AIzaSyCRSmCG6lYBfgGnYsYSBgIJzp1oGQALqws',
    authDomain: 'shopping-list-faef5.firebaseapp.com',
    projectId: 'shopping-list-faef5',
    storageBucket: 'shopping-list-faef5.appspot.com',
    messagingSenderId: '679139996781',
    appId: '1:679139996781:web:40a670f6f894b6cd033b64',
}

const dbConfig = () => {
    initializeApp(firebaseConfig)
    const db = getFirestore()

    return db
}

export default dbConfig

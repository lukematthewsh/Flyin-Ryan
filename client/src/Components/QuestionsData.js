import { database } from '../firebaseApp.js'

async function dbFetch() {
    const db = await database.ref(`/data`).once('value').then(function (snapshot) {
        let dbInfo = snapshot.val()
        return dbInfo
    })
    return db
}

export default dbFetch


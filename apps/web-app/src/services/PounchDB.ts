import PouchDB from 'pouchdb'

export const db = new PouchDB('dbname')

console.log('Database created Successfully.')

//You can get the basic information about the database using the method named info()

db.info((err, info) => {
    if (!err) {
        console.log(info)
    }
})

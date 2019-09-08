//CRUD

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID} = require('mongodb')

// const id = new ObjectID()
// console.log(id.id.length)


// console.log(id.getTimestamp())
// 5d60e36c3d1d08a94255b0f0


const connectionURL = 'mongodb://127.0.0.1:27017' //localhost address don't type localhost instead use 127.0.0.1
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if (error){
       return console.log('Unable to connect to database')
    }
   
    //  console.log('Connected Correctly!')
    const db = client.db(databaseName)
      
    db.collection('users').deleteMany({
        age: 22
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })








    // db.collection('users').updateOne({
    //     _id: new ObjectID("5d60e36c3d1d08a94255b0f0")

    // },{
    //     // $set: {
    //     //     name: 'Mike'
    //     // }
    //     $inc: {
    //         age: 1
    //     }

    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {

    //     console.log(error)
    // })
//  db.collection('tasks').updateMany({
//      completed: false
//  },{
//      $set: {
//          completed: true
//      }
//  }).then((result) => {
//     console.log(result.matchedCount)
// }).catch((error) => {

//     console.log(error)
// })










    //    db.collection('users').findOne({name: 'Nishant'},(error, user) => {
            
    //     if(error){

    //         return console.log('unable to fetch')
    //     }

    //     console.log(user)

        // db.collection('users').find({ age: 21}).toArray((error, users) => {

        //     console.log(users)
        // })


        // db.collection('users').find({ age: 21}).count((error, count) => {

        //     console.log(count)
        // })

        // db.collection('tasks').findOne({ _id: new ObjectID("5d60f7eba8826ea9c91621f6") }, ( error, tasks ) => {


        //     console.log(tasks)
        // })

        // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {

        //     console.log(tasks)
        // })
       






 
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Nishant02',
    //     age: 27

    // }, (error, result) => {

    //     if(error){
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })

    //  db.collection('users').insertMany([
    //      {

    //     name: 'Nishant',
    //     age: 21
    //  },{

        // name: 'Nish',
        // age: 22

    //  }
    // ],(error, result) => {
        // if (error){
        //     return console.log('Unable to insert documents!')
        // }

        // console.log(result.ops)


    // })

    // db.collection('tasks').insertMany([
    //  {
    //     description: 'Clean the house',
    //     completed: true

    //  },{
    //     description: 'Renew inspection',
    //     completed: false

    //  },{

    //     description: 'Pot plants',
    //     completed: false
    //  }




    // ],(error, result) => {
    //     if (error){
    //         return console.log('Unable to insert documents!')
    //     }

    //     console.log(result.ops)





    // })

})
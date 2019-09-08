 const mongoose = require('mongoose')
//  const validator = require('validator')

 mongoose.connect(process.env.MONGODB_URL, {
     useNewUrlParser: true,
     useCreateIndex: true,
     useFindAndModify: false
 })




// const Task = mongoose.model('Task',{
//     description: {
//     type: String,
//     required: true,
//     trim: true
//     },
//     completed: {
//      type: Boolean,
//      default: false
//     }


// })

// const task = new Task({

//     description: 'Learn thr mongooose liberary',
//     completed: true
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log('Error!', error)
// })

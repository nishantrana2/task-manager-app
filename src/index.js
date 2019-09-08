const express = require('express')
require('./db/mongoose') // only require since only used for connecting mongoose
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT 

// const multer = require('multer')

// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000 //1 megabite max value of the file can be
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//            return cb(new Error('Please upload a word document')) 

//         }

//         cb(undefined,true)
        
//         //  cb(new Error('File must be a pdf'))
//         //  cb(undefined, true)
//         //  cb(undefined, false)

//     }
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// })


// app.use((req,res,next) => {
//     if ( req.method === 'GET') {
//         res.send('GEt req are disabled')
//     }else {
//         next()

//     }
// })

// // app.use((req,res,next) => {
// //     res.send('main')
// // })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


// const jwt = require('jsonwebtoken')
// const myfunction = async () => {
//    const token = jwt.sign({ _id: 'abc123'},'thisismynewcourse',{ expiresIn: '7 days'})

// //    console.log(token)

//    const data = jwt.verify(token, 'thisismynewcourse')
// //    console.log(data)
// }
// myfunction()


app.listen(port, () => {
 
    console.log('Server is up on port' + port)
})


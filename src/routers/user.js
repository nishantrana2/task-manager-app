const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail } = require('../emails/account')
const { sendCancelationEmail } = require('../emails/account')

router.post('/users', async (req,res) => {
    const user = new User(req.body)


    try{
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.send({ user, token})
        res.status(201).send(user)
    } catch(e){
        res.status(400).send(e)
    }
    // user.save().then(() => {
    //     res.status(201).send(user)

    // }).catch((e) => {
    //     res.status(400).send(e)
       
    // })
   
})

router.post('/users/login', async (req, res) => {

try{
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.status(200).send({ user, token})

}catch(e){
    res.status(400).send()

}

})


router.post('/users/logout', auth , async (req, res) => {

    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send()

    }catch(e){

        res.status(500).send()

    }

})


router.post('/users/logoutAll', auth , async (req, res) => {

    try{
        req.user.tokens = []

        await req.user.save()
        res.send()

    }catch(e){

        res.status(500).send()

    }

})


router.get('/users/me', auth ,async (req, res) => {
 
    res.send(req.user)


//    try {
//        const users = await User.find({})
//        res.send(users)
//    } catch(e){
//     res.status(500).send()
//    }

    // User.find({}).then((users) => {
    //    res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload file of size less than 1MB and file extention of jpg,jpeg and png'))
        }
        cb(undefined, true)
    }
})
// const errorMiddleware = (req, res, next) => {
//     throw new Error('from my midlleware')
// }



router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
     const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()

})

router.get('/users/:id/avatar', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()

        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)

    }catch(e){
        res.status(400).send()
    }
})

 router.get('/users/:id',async (req, res) => {
    //  console.log(req.params)
     const _id = req.params.id

     try{
         const user = await User.findById(_id)
         if(!user){
         return res.status(404).send()
        }
        res.send(user)

     }catch(e){

        res.status(500).send()

     }
    //  User.findById(_id).then((user) => {
    //      console.log(req.param)
    //      if(!user){
    //          return res.status(404).send()
    //      }
    //      res.send(user)

    //  }).catch((e) => {
    //        res.status(500).send()
    //  })
 })


// router.get('/users/:id',async (req, res) => {
//     const _id = req.params.id

//     try{
//        const task = await Task.findById(_id)
//        if(!task){
//         return res.status(404).send()
//     }
//     res.send(task)
//     }catch(e){
//         res.status(500).send()

//     }
//     // Task.findById(_id).then((task) => {

//     //     if(!task){
//     //         return res.status(404).send()
//     //     }
//     //     res.send(task)
        
//     // }).catch((e) => {
//     //     res.status(500).send()
//     // })
// })





//update user
router.patch('/users/me', auth, async (req, res) => {
    // const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation= updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'INVALID UPDATE'})
    }
    try{


        // const user = await User.findById(req.params.id)

        updates.forEach((update) => {
            req.user[update] = req.body[update]

        })

        await req.user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        // console.log(user)
        //    if(!user){
        //        return res.status(404).send()

        //    }
           res.send(req.user)

    }catch(e){
    res.status(400).send(e)
    }

})

// Delete
router.delete('/users/me' , auth , async (req,res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        // }

        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name) 
        res.send(req.user)
      
    } catch (e) {
        res.status(user)
    }
})


module.exports = router
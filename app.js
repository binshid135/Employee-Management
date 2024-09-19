const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

const port = 8080

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use(express.urlencoded({ extended: true }))

const Admin = require('./models/Admin')
const Log = require('./models/Login')
const Emp = require('./models/Employees')
const db = require('./config/db')
db()

const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({ storage })

app.post('/login', async (req, res) => {
    console.log(req.body);
    const email = req.body.mail
    const password = req.body.pass

    const logins = await Log.findOne({ email: email, password: password })
    console.log(logins);
    const admin = await Admin.findOne({ email: email, password: password })

    if (logins) {
        res.json({ "data": "ok", sid: admin._id })
    }
    else {
        res.json({ "data": "not exist" })
    }


})
app.post('/postadmin', async (req, res) => {
    const email = req.body.email
    const username = req.body.uname
    const password = req.body.pass

    const admins = await Admin.findOne({ email: email })

    if (admins) {
        res.json({ "data": "exist" })
    }
    else {
        var items = {
            email: email,
            username: username,
            password: password
        }
        var items2 = {
            email: email,
            password: password
        }

        const newadmin = new Admin(items)
        await newadmin.save()
        const newlogin = new Log(items2)
        await newlogin.save()

        res.json({ "data": "ok" })
    }


})
app.post('/postemployee', upload.single('fl'), async (req, res) => {
    const name = req.body.name
    const mail = req.body.mail
    const num = req.body.num
    const des = req.body.designation
    const gender = req.body.gender
    const course = req.body.course
    const image = req.file.path

    const emps = await Emp.findOne({ mail: mail })
    if (emps) {
        res.json({ "data": "exist" })
    }
    else {

        var items = {
            name: name,
            mail: mail,
            mobile: num,
            designation: des,
            gender: gender,
            course: course,
            image: image
        }
        const newemp = new Emp(items)
        await newemp.save()


        res.json({ "data": "ok" })
    }


})

app.get('/adminget/:sid', async (req, res) => {
    const sid = req.params.sid
    const admin = await Admin.findOne({ _id: sid })
    res.json({ data: admin.username })
})

app.get('/getemployee', async (req, res) => {
    const data = await Emp.find()
    res.json({ data: data })
})

app.post('/delete', async (req, res) => {
    const id = req.body.id
    console.log();
    await Emp.findOneAndDelete({ _id: id })

    res.json({ "data": "del" })
})


app.get('/edit/:id', async (req, res) => {
    const id = req.params.id
    const data = await Emp.findOne({ _id: id })
    res.json({ data: data })
})

app.post('/editpost', upload.single('fl'), async (req, res) => {
    const name = req.body.name
    const mail = req.body.mail
    const num = req.body.num
    const des = req.body.designation
    const gender = req.body.gender
    const course = req.body.course
    var id=req.body.id

    var items = {
        name: name,
        mail: mail,
        mobile: num,
        designation: des,
        gender: gender,
        course: course,
    }

    if (req.file) {
        const image = req.file.path
        items.image = image
    }

    await Emp.findOneAndUpdate(
        { _id: id },
        { $set: items },
        { new: true })
        
    res.json({"data":"ok"})
    
})


app.listen(port)

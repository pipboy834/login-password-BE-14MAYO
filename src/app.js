import express from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import initializePassport from "./config/passport.config.js"
const app = express()
const PUERTO = 8080

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("./src/public"))
app.use(cookieParser())
app.use(passport.initialize())
initializePassport()
app.post ("/login", (req, res)=>{
    let {usuario, pass} = req.body
    if (usuario === "messi" && pass === "lionel"){
        let token = jwt.sign({usuario, pass }, "coderhouse", {expiresIn: "24h"})
        //res.send({message: "login exitoso", token})
        res.cookie("coderCookieToken", token, {maxAge: 60*60*1000, httpOnly: true}).send({message:"login exitoso por suerte"})



    }else{
        res.send({message: "login fallido"})
    }
})

app.get ("/current", passport.authenticate("jwt", {session: false}),(req, res)=>{
    res.send(req.user)
})

app.listen(PUERTO, ()=>{
    console.log(`escuchando en el puerto ${PUERTO}`)
})
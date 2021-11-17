import {io} from "../http"
import {Requests} from "../models/Requests"
import crypto from "crypto"
var token: string;
var handleClose: any;
var handleTime: any;


io.on("connect", socket => {
    socket.on('access', (data: Requests) => {
        console.log(data.command)
        if(data.command === "RequestAccess"){ 
            clearTimeout(handleClose)
            handleClose = setTimeout(() => {
                console.log("ja foi")
                token: "";
                clearInterval(handleTime)
                socket.emit("timeOut", {
                    "response": "ConnectionTimedOut",
                    "payload": {
                        
                    }
                })
            }, 20000)
            token = crypto.randomBytes(16).toString("hex");
            console.log("tudo certo, id:", token)
            socket.emit("id", {
            "response": "RequestAccessOk",
            "payload": {
                "token": token
            }
        })}
    })
    socket.on('lock', (data: Requests) => {
        console.log(data.command)

        if(data.command === "RequestLock" && data.payload.token === token)
        {   console.log("lock")

            clearTimeout(handleClose)
            handleClose = setTimeout(() => {
                console.log("ja foi")
                token: "";
                clearInterval(handleTime)
                socket.emit("timeOut", {
                    "response": "ConnectionTimedOut",
                    "payload": {
                        
                    }
                })
            }, 20000)

            handleTime = setInterval(() => {
                let date = new Date();
                let time = date.toLocaleTimeString(); 
                socket.emit("time",
                {
                    "response": "BitTimeEvent",
                    "payload": {
                        "time": time
                    }
                }
                
                )
            }, 1000)

            socket.emit("lockOK", 
            {
                "response": "RequestLockOk",
                "payload": {}
            })
        }
    })

    socket.on('unlock', (data: Requests) => {
        console.log(data.command)
        if(data.command === "UnlockService" && data.payload.token === token)
        {   console.log("lock")
             clearTimeout(handleClose)
             handleClose = setTimeout(() => {
                console.log("ja foi")
                clearInterval(handleTime)
                socket.emit("timeOut", {
                    "response": "ConnectionTimedOut",
                    "payload": {
                    }
                })
            }, 20000)
             clearInterval(handleTime)
            socket.emit("unlockOK", {
            "response": "RequestUnlockOk",
            "payload": {
                
            }
        })}
    
    })

})



import cors from "cors";
import  express  from "express";
import {createServer} from "http"
import {Server} from "socket.io"

const app = express();

const server = createServer(app);
app.use(cors({ origin: '*' }));
const io = new Server(server,{
    cors: {
        origin: "*"
      }
});

io.on("connection", (socket) => {
    return console.log("socket:", socket.id)
})



export {server, io}
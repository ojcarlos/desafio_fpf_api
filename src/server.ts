import { server } from "./http";
import "./websockets/controls"
server.listen(3333, () => console.log("websocket id running"))
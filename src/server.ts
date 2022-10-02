import express from "express";
import { log } from "./utils/logger";
import { config } from "./utils/config";
import { ConnetDb } from "./utils/dbConfig";
import { routes } from "./routes";
import cors from 'cors'
import cookieParser from "cookie-parser";
import { createServer } from "./utils/createServer";
// const app = express();




const signals = ["SIGINT", "SIGTERM", "SIGHUP"] as const;



// var client =


//   (async function () {
//     await client.connect()
//   })()

// client.on('error', function (err: any) { return false })
// client.on('connect', function () {
//   console.log('Redis connected')
// })

async function graceFulShutDown({ signal, server }: {
  signal: string,
  server: any
}) {
  process.on(signal, async () => {
    server.close();
    console.log(`I am called ${signal}`);
    process.exit(0);
  });
}

// const server = app.listen(port, async () => {
//   log.info(`server started ${port}`);
//   await ConnetDb();
//   routes(app);
//   // graceFulShutDown(signals);
// });
// for (let i = 0; i < signals.length; i++) {
//   graceFulShutDown(signals[i]);
// }

async function startServer() {
  const server = await createServer()
  const port = config.PORT;

  server.listen(port, async () => {
    log.info('server started')
    await ConnetDb()
  })

}
startServer()
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import { DATABASE_URL, SERVER_PORT } from "./config";
// import userRoutes from "./routes/auth";

// app 
const app = express();

// db
const connectDB = () => {
  const url = DATABASE_URL;
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };
  return mongoose.connect(url, options);
};

const disconnectDB = () => {
  return mongoose.disconnect();
};

// server
const startServers = () => {
  const port = SERVER_PORT;
  return new Promise<void>((resolve, reject) => {
    connectDB
      .then(() => {
        console.log("DB Connected");
      })
      .then(() => {
        app
          .listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve();
          })
          .on("error", (error) => {
            disconnectDB();
            reject(error);
          });
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

const closeServers = () => {
  return new Promise<void>((resolve, reject) => {
    disconnectDB()
      .then(() => {
        console.log("Closing server");
        app.close((error) => {
          if (error) {
            return reject(error);
          }
          resolve();
        });
      })
      .catch((error) => {
        console.error(`Cannot close db: ${error}`);
      });
  });
};

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// routes
// app.use("/api", userRoutes);

// cors
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

if (require.main === module) {
  process.on("SIGTERM", closeServers);
  process.on("SIGINT", closeServers);

  startServers()
    .then(() => {
      console.log("Server up and running.");
    })
    .catch((error) => {
      console.error(error);
    });
}

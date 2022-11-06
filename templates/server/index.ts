import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import passport from 'passport';
import path from 'path';
import { DATABASE_URL, PORT } from './config';
import { dbConnect, mongoOptions } from './db-mongoose';
import { authRouter, jwtStrategy, localStrategy } from './routes';
const cors = require("cors");

const port = process.env.PORT || 8000;

const runServer = (databaseUrl = DATABASE_URL, port = PORT) => {
  return new Promise<void>((resolve, reject) => {
    mongoose.connect(databaseUrl, mongoOptions as ConnectOptions, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
};

const closeServer = () => {
  return mongoose.disconnect().then(() => {
    return new Promise<void>((resolve, reject) => {
      console.log('Closing server');
      return server.close((err: any) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
};

//app
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

//routes middleware
app.use("/api", authRoutes);

// cors
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

const root = path.join(__dirname, '../client', 'build');
app.use(express.static(root));
app.get('/', (req, res) => {
  res.sendFile('index.html', { root });
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/auth', authRouter);

let server: any;

if (require.main === module) {
  dbConnect(DATABASE_URL);
  runServer();
}

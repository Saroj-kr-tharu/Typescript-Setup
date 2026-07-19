import cors, { CorsOptions } from "cors";
import express from 'express';
import rateLimit from "express-rate-limit";
import { serverConfig } from './config';
import logger from './config/logger.config';
import { appErrorHandler, genericErrorHandler } from './middlewares/error.middleware';
import v1Router from './routers/v1/index.router';

const app = express();
app.set('trust proxy', 1); 

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 50,
  skip: (req) => req.method === "OPTIONS"
});


const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    const allowedOrigins = [serverConfig.FORTEND_URL];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(limiter);


app.use(express.json());
app.use('/api/v1', v1Router);

app.use(appErrorHandler);
app.use(genericErrorHandler);
logger.info("fortend url => ", serverConfig.FORTEND_URL)

app.listen(serverConfig.PORT, async () => {
    logger.info(' Database connected');
    logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
    logger.info(`Press Ctrl+C to stop the server.`);
});

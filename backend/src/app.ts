import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import logger from "./utils/logger";
import { AppError } from "./utils/appError";
import errorHandler from "./middleware/errorHandler";

const app = express();

const morganFormat = ":method :url :status :response-time ms";

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  }),
);

import routerV1 from "./routes/v1";

app.use("/api/v1", routerV1);

app.get("/", (_req, res) => {
  res.send("API is running...");
});

app.all("*", (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;

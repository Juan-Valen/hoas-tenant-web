
const connectDB = require("./config/db");
const express = require("express");
// const carRouter = require("./routes/carRouter");
const reservationRouter = require("./routes/reservationRouter");
const itemRouter = require("./routes/itemRouter");
const spaceRouter = require("./routes/spaceRouter");
const userRouter = require("./routes/userRouter")
const {requestLogger,unknownEndpoint,errorHandler} = require("./middleware/customMiddleware");
const cors = require("cors");

 
// express app
const app = express();

connectDB();

app.use(cors());
 
// middleware
app.use(express.json());

app.use(requestLogger);

app.get("/", (req, res) => res.send("API Running!"));

// routes

// // Use the carRouter for all /cars routes
// app.use("/api/cars", carRouter);

// Use the userRouter for all /users routes¨
app.use("/api/users", userRouter)

// Use the itemRouter for all /cars routes
app.use("/api/items", itemRouter);
// Use the marketRouter for all /cars routes

// Use the reservationRouter for all /reservations routes
app.use("/api/reservations", reservationRouter);

// Use the spaceRouter for all /speces routes
app.use("/api/spaces",spaceRouter)

app.use(unknownEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);

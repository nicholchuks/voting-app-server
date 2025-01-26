const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
require("dotenv").config();

const Routes = require("./routes/Routes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));

app.use("/api", Routes);

app.use(notFound);
app.use(errorHandler);

connect(process.env.MONGO_URL)
  .then(
    app.listen(process.env.PORT, () =>
      console.log(`Server started on port ${process.env.PORT}`)
    )
  )
  .catch((err) => console.log(err));

// app.listen(process.env.PORT, () =>
//   console.log(`Server started on port ${process.env.PORT}`)
// );

// connect(process.env.MONGO_URL)
//   .then(
//     app.listen(process.env.PORT, () =>
//       console.log(`Server started on port ${process.env.PORT}`)
//     )
//   )
//   .catch((err) => console.log(err));

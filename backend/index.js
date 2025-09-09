require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const router = require("./routes/UserRoutes");
const app = express();

try {
  mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("DB Connected");
  });
} catch (error) {
  console.log(error);
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

//routes
app.use("/auth", router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, (req, res) => {
  console.log(`server is running on PORT ${PORT}`);
});

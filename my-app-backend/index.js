const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const connectToMongo = require("./db");
const User = require("./models/user.model");
const checkAuth = require("./models/middleware/auth");

const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
    },
  })
);

// default App Route
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

//Available Routes for User
// Register Route

app.post("/api/register", async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    if (err.code === 11000) {
      let message = "Duplicate value(s): ";
      const fields = Object.keys(err.keyPattern).join(" ");
      message = `${message}[${fields}]`;
      res.status(400).json({ message });
    }
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    {
      name: user.name,
      email: user.email,
    },
    "secret123",
    { expiresIn: "1h" }
  );

  return res.status(200).json({ ...user._doc, token });
});

app.listen(port, async () => {
  await connectToMongo();
  console.log(`Example app listening on port ${port}`);
});

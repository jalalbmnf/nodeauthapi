const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created...",
        authData,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  // MOCK USER

  const user = {
    id: 1,
    username: "jalalbmnf",
    email: "calalmnf@gmail.com",
  };

  jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify token
function verifyToken(req, res, next) {
  // Get auth header value

  const bearerHeader = req.headers["authorization"];
  // Check bearer is undefined

  if (typeof bearerHeader != "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array

    const bearerToken = bearer[1];

    // Set the token
    req.token = bearerToken;
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

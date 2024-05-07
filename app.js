require("dotenv").config(); 
require("./config/connection"); 
require("./config/authStrategy"); 
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors"); 
const helmet = require("helmet"); 
const session = require("express-session"); 
const passport = require("passport"); 

app.use(morgan("dev"));

const booksRoutes = require('./routes/booksRouter');
const authorsRoutes = require('./routes/authorsRouter');
const adminRoutes = require('./routes/adminRouter'); 
const siteRoutes = require('./routes/siteRouter'); 

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + "/public")));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize()); 
app.use(passport.session()); 

app.get("/", (request, response, next) => {
  response.status(200).json({success: {message: "This route points to the Home page"}, statusCode: 200});
});

app.use(booksRoutes);
app.use(authorsRoutes);
app.use(adminRoutes); 
app.use(siteRoutes); 

app.listen(PORT, () => {
  console.log(`Carol's bookstore server is listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}/`)
});
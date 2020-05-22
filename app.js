const path = require("path");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const redis = require("redis");
const redisStore = require("connect-redis")(session);
require("dotenv").config({ path: path.join(__dirname, ".env") });
const hbs = require("hbs");

const routes = require("./routes/index");
const response = require("./utils/response");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','hbs');
app.use(response);

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "secret",
    store: new redisStore({
      host: "localhost",
      port: 6379,
      client: redis.createClient(),
    }),
    cookie: { maxAge: 604800000 },
  })
);

app.use('/', routes);

const port = 5000 || process.env.port;
app.listen(port, () => console.log(`Server running on port ${port}`));

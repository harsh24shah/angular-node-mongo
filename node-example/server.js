const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');
const connectDB = require('./server/databse/connection');
const routes = require('./server/routes/user-router');

const app = express();

const PORT = process.env || 8080;
dotenv.config({ path: 'config.env' });

// to log requests
app.use(morgan('tiny'));

// db connection 
connectDB();

// request body parser
const rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}

app.use(bodyparser.json({ verify: rawBodySaver }));

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(routes);

app.get('/', (req, res) => {
  res.send('CRUD application server started');
});

app.listen(PORT, () => { console.log(`server is runing on http://localhost:${3000}`) });

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const ErrorHandler = require('./helpers/error-handler');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const RouteV1 = require('./routes/v1/index');

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));

app.use(morgan('dev'));

app.use(helmet());


RouteV1(app);

//error handler
app.use(ErrorHandler);


module.exports = app;
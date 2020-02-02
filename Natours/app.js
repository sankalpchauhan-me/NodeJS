const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1 Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`));

//Defining our own middleware
app.use((req, res, next) => {
  console.log('Hello From the middleware');
  //next() is used to send it to the next stack in the middleware if we do not do that we will be stuck here forever
  next();
});

app.use((req, res, next) => {
  req.timeOfReq = new Date().toISOString();
  next();
});

/*
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});
*/

// 2) ROUTE HANDLERS (IN Controllers folder)

// 3 ROUTES

// app.get('/api/v1/tours', getTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//Multiple routrers

// Mounting
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) Start Server

module.exports = app;

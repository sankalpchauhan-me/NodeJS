const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

//1 Middlewares
app.use(express.json());

app.use(morgan('dev'));

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

const tours = JSON.parse(
  fs.readFileSync(__dirname + '/dev-data/data/tours-simple.json')
);

const users = JSON.parse(
  fs.readFileSync(__dirname + '/dev-data/data/users.json')
);

// 2) ROUTE HANDLERS
const createTour = (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    __dirname + '/dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        tours: newTour
      });
    }
  );

  //res.send("Done");
};

const updateTour = (req, res) => {
  const id = Number(req.params.id);
  if (tours.length < id) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        message: '<Some Tour></Some>'
      }
    });
  }
};

const getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestTime: req.timeOfReq,
    data: {
      tours
    }
  });
};

const getTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find(el => el.id === id);
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  }
};

const deleteTour = (req, res) => {
  const id = Number(req.params.id);
  if (tours.length < id) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  } else {
    res.status(204).json({
      status: 'success',
      data: null
    });
  }
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet implemented'
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet implemented'
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet implemented'
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet implemented'
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet implemented'
  });
};

// 3 ROUTES

// app.get('/api/v1/tours', getTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
  .route('/')
  .get(getTours)
  .post(createTour);
tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser);
userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) Start Server

const port = 3000;
app.listen(port, () => {
  console.log('App listening on port ' + port);
});

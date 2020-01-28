const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(__dirname + '/../dev-data/data/tours-simple.json')
);

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestTime: req.timeOfReq,
    data: {
      tours
    }
  });
};

exports.getTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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

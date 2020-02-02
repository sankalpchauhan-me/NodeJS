const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);
//   if (Number(req.params.id) > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID'
//     });
//   }
//   next();
// };

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Tour missing name or body'
    });
  }
  next();
};

exports.createTour = (req, res) => {
  //console.log(req.body);
  res.status(201).json({
    status: 'success'
    // data: {
    //   tours: newTour
    // }
  });
  //res.send("Done");
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: '<Some Tour></Some>'
    }
  });
};

exports.getTours = (req, res) => {
  res.status(200).json({
    status: 'success'
    //   results: tours.length,
    //   requestTime: req.timeOfReq,
    //   data: {
    //     tours
    //   }
  });
};

exports.getTour = (req, res) => {
  const id = Number(req.params.id);
  // const tour = tours.find(el => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour
  //   }
  // });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};

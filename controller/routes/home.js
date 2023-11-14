const Phone = require('../models/Phone');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.post('/home', async(req, res) => {
    try {
      const {name,brand,color,photo,desc,price,status} = req.body;
      const phone = new Phone({name,brand,color,photo,desc,price,status});
      await phone.save();
      res.status(201).send(phone);
    } catch (err) {
      res.status(400).send(err);
    }
    console.log(req.body);
  });
  app.post('/home:id', async(req, res) => {
    // Validate ObjectId 
      try {
        // const {name,brand,color,photo,desc,price,status} = req.body;
        // const phone = new Phone({name,brand,color,photo,desc,price,status});
        const update = await Phone.findByIdAndUpdate(req.params.id,{ $set: req.body});
        res.status(201).send(update);
      } catch (err) {
        res.status(400).send(err);
    }
  
  });

};



// routes.get('/', (req, res) => {
//     res.end("Oke")
// });

// routes.post('/', async (req, res) => {
//     // try {
//     //   const phone = new Phone(req.body);
//     //   await phone.save();
//     //   res.status(201).send(phone);
//     // } catch (err) {
//     //   res.status(400).send(err);
//     // }
//     console.log(req.body);
//   });


// routes.put('/:id', async (req, res) => {
// try {
//     const phone = new Phone(req.body);
//     await phone.findByIdAndUpdate(req.params.id,{ $set: req.body });
//     res.status(201).send(phone);
// } catch (err) {
//     res.status(400).send(err);
// }
// });

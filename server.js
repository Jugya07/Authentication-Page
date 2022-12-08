const mongoose = require('mongoose');

const app = require('./app');

mongoose.set('strictQuery', true);

mongoose
  .connect('mongodb://localhost:27017/newDB', {
    useNewUrlParser: true
  })
  .then((con) => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    throw err;
  });

const port = 8000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

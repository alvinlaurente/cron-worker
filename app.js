var createError = require('http-errors');
var express = require('express');
var axios = require('axios');
const schedule = require('node-schedule');

var app = express();
var port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

schedule.scheduleJob('*/10 * * * * *', async () => {
  console.log('---------------------------------------------------------');
  try {
    const tester = await axios.get('http://localhost:1337/v1/leaderboard/redeem/process-claim')

    console.log(tester.data)
  } catch (error) {
    console.log(error)
  }
  console.log('---------------------------------------------------------');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;

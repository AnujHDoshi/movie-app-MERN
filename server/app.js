require('dotenv').config();
const express = require('express');
const cors = require('cors');

const movieRouter = require('./routes/moviesRouter');
const models = require('./model');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/movie', movieRouter);

app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(4000, () => {
  console.log('Server is running...')
})


module.exports = app;

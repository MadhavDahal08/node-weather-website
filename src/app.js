const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT||3000;

// define path for express configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('views',viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name:'Madahv Dahal'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Me',
    name:'Madhav'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'help message from the help route',
    title: 'Help',
    name:'Madhav Dahal'
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
        error:'Address is not provided'
    });
  }
  geocode(address, (error, { longitude, latitude, location }={}) => {
    if (error) {
      res.send({
        error
      });
    } else {
      forecast(longitude, latitude, (error, { summary, temperature, precipProbability }) => {
        if (error) {
          res.send({ error });
        } else {
          res.send({
            location,
            summary,
            temperature,
            precipProbability,
            address
          });
        }
      });
    }
  });
});
app.get('/help/*', (req, res) => {
  res.render('error.hbs', {
    title: 'Error!',
    name:'Madhav Dahal',
    message: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('error.hbs', {
    title: '404',
    name:'Madhav Dahal',
    message: 'Page not found'
  });
});

// listening to the server
app.listen(port, () => {
  console.log('Server is up on port:' + port);
});
const request = require('request');
const forecast = (lognitude,latitude,callback) => {
  const url = `https://api.darksky.net/forecast/e6af5b5feb891b272e18f5e2fc0370a6/${latitude},${lognitude}?units=si`;
  request({ url: url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unabel to connect to the network',undefined);
    } else if (body.error) {
      callback('Unable to find location ',undefined);
    } else {
      const data = {
        temperature : body.currently.temperature,
        precipProbability: body.currently.precipProbability,
        summary: body.daily.data[0].summary,
        temperatureHigh: body.daily.data[0].temperatureHigh,
        temperatureLow: body.daily.data[0].temperatureLow
      }
      callback(undefined,data);
    }
  });
}
module.exports = forecast;

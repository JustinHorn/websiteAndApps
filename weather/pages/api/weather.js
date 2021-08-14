var unirest = require("unirest");

var weatherRequest = unirest(
  "GET",
  "https://community-open-weather-map.p.rapidapi.com/weather"
);

weatherRequest.headers({
  "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
  "x-rapidapi-key": process.env.RAPIDAPI_KEY,
  useQueryString: true,
});

export default async (req, res) => {
  let message = null;

  if (req.params) {
    console.log(req.params);
  }

  weatherRequest.query({
    lat: req.query.lat,
    lon: req.query.lon,
    lang: "null",
    units: "metric",
  });

  await weatherRequest.send().then(function (result) {
    if (result.error) {
      res.statusCode = 400;
      message = result.error;
    } else {
      res.statusCode = 200;
      message = result;
    }
  });
  res.json(message.body);
};

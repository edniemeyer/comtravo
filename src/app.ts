import express from "express";
import timeout from "connect-timeout";
import FlightsApi from "./api/flights";
import cache from "./utils/cache";

const app = express();

const api = new FlightsApi();

app.use(timeout('1s'))

app.get("/", cache(30), (req, res) => {
  api.getMergedFlights()
    .then(mergedFlights => {
      if (req.timedout) return;
      return res.send(JSON.stringify([...mergedFlights.values()]));
    })

});


export default app;
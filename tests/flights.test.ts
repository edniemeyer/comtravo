import axios from 'axios';
import { API_URL } from '../src/config'


import { source1, source2 } from './mock/flights.mock'
import FlightsApi from '../src/api/flights';

jest.mock('axios');

describe('Merge Flights', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return merged flights', () => {
    axios.get = jest.fn().mockImplementation((url) => {
      switch (url) {
        case `${API_URL}/source1`:
          return Promise.resolve(source1)
        case `${API_URL}/source2`:
          return Promise.resolve(source2)
        default:
          return Promise.reject(new Error('not found'))
      }
    })

    const api = new FlightsApi();

    api.getMergedFlights().then((result) => {
      expect(result).toEqual([{
        "origin_name": "Schonefeld",
        "destination_name": "Stansted",
        "departure_date_time_utc": "2019-08-08T04:30:00.000Z",
        "arrival_date_time_utc": "2019-08-08T06:25:00.000Z",
        "flight_number": "144",
        "duration": 115
      },
      {
        "origin_name": "Stansted",
        "destination_name": "Schonefeld",
        "departure_date_time_utc": "2019-08-10T06:50:00.000Z",
        "arrival_date_time_utc": "2019-08-10T08:40:00.000Z",
        "flight_number": "145",
        "duration": 110
      },
      {
        "origin_name": "Schonefeld",
        "destination_name": "Stansted",
        "departure_date_time_utc": "2019-08-08T20:25:00.000Z",
        "arrival_date_time_utc": "2019-08-08T22:25:00.000Z",
        "flight_number": "8545",
        "duration": 120
      },
      {
        "origin_name": "Stansted",
        "destination_name": "Schonefeld",
        "departure_date_time_utc": "2019-08-10T18:00:00.000Z",
        "arrival_date_time_utc": "2019-08-10T20:00:00.000Z",
        "flight_number": "8544",
        "duration": 120
      },
      {
        "origin_name": "Schonefeld",
        "destination_name": "Stansted",
        "departure_date_time_utc": "2019-08-08T16:00:00.000Z",
        "arrival_date_time_utc": "2019-08-08T17:55:00.000Z",
        "flight_number": "146",
        "duration": 115
      },
      {
        "origin_name": "Stansted",
        "destination_name": "Schonefeld",
        "departure_date_time_utc": "2019-08-10T18:00:00.000Z",
        "arrival_date_time_utc": "2019-08-10T20:00:00.000Z",
        "flight_number": "8544",
        "duration": 120
      }
      ])
    })

  })
})

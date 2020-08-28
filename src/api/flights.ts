import axios from "axios";
import { API_URL, API_USERNAME, API_PASSWORD } from "../config"

class FlightsApi {

    private mergedFlights: Map<string, object>;
    private flights1: Map<string, object>;
    private flights2: Map<string, object>;

    constructor() {
        this.mergedFlights = new Map<string, object>();
        this.flights1 = new Map<string, object>();
        this.flights2 = new Map<string, object>();
    }

    private mapBuilder = (data: any, map: Map<string, object>) => {
        data.forEach((flight: any) => {
            flight.slices.forEach((slice: any) => {
                const key = `${slice.flight_number}_${slice.departure_date_time_utc}_${slice.arrival_date_time_utc}`;
                map.set(key, slice);
                this.mergedFlights.set(key, slice);
            });
        });
    }

    private flightsSource1 = () => {
        return axios.get(`${API_URL}/source1`).then((response) => {
            this.mapBuilder(response.data.flights, this.flights1);
        }).catch((e) => {
            // console.log(e.message);
            // console.error('Error Source1');
        });
    }

    private flightsSource2 = () => {
        return axios.get(`${API_URL}/source2`, {
            auth: {
                username: API_USERNAME,
                password: API_PASSWORD
            }
        }).then((response) => {
            this.mapBuilder(response.data.flights, this.flights2);
        }).catch((e) => {
            // console.log(e.message);
            // console.error('Error Source2');
        });
    }

    public getMergedFlights = () => {
        // parallel requests
        return Promise.all([this.flightsSource1(), this.flightsSource2()])
            .then(() => this.mergedFlights);
    }

}

export default FlightsApi;
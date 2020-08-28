# Merge Flights API
## Task
Please plan and implement a service in Node.js which consumes 2 endpoints
(https://discovery-stub.comtravo.com/source1 & https://discovery-stub.comtravo.com/source2)
exposed by discovery-stub service(details see below).
Your service should get flights from these 2 routes, merge them, remove duplicates and send to the
client.
As an identity of the flight can be used the combination of flight numbers and dates.
Note that discovery-stub service is not stable, i.e. it can sometimes fail or reply after couple of
seconds.
The response time of your service shouldn't take longer than 1 second.

## Solution
The challenge on this task had basically two main aspects: *accessing and merging the two external endpoints responses* and *response time shouldn't take longer than 1s*.

For the first aspect, to make it faster to retrieve the data from both endpoints, it was used a *Promise.all* to call both endpoints asynchronously and in parallel, awaiting both calls to be resolved or rejected. Afterwards, I just setted the data in *Map<string, object>* with a *key* constructed as `${slice.flight_number}_${slice.departure_date_time_utc}_${slice.arrival_date_time_utc}` and value being the *object* representing the flight slice. By using the key like that, the duplicates are gonna be removed and the datas from *source1* and *source2* will be merged.

For the latter, as the response time from our server's endpoint should be maximum of 1s, and we don't have any control over the external sources, as they can fail or take longer than expected, the solution found was to apply a server-side memory cache. This way, we won't have the need to make multiple calls to failure-prone external endpoints. But, of course, the cache has to expire from time to time to keep the data updated, and we will need to check the external endpoints once again when this occurs. The chosen duration of the cache was 30s for this task.

## How to run?
To run the server, first rename `.env.example` to `.env`, not forgetting to add the authentication parameters needed for the *source2*. Then, you can run the following commands:

- `npm run dev`: Run app server in development mode;
- `npm start`: Builds and run the app server (compile .ts to .js);
- `npm test`: Runs integration and unit tests.
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
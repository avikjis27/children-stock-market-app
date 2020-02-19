# Welcome to children's stock market app


## Microservice ecology


```

                                     |----> [today-service:6000]   -----> [External Service1]
[front-end:8080]->[middleware:9000]--|
                                     |----> [bitcoin-service:5000] -----> [External Service2]


```
## How to run the application
- `docker-compose build`
- `docker-compose up`

## How to fetch data
`curl 127.0.0.1:8080/data`
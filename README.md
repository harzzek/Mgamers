# Mgamers
Udvikling af et online-registreringssystem

## Setup

### Installations needed

- Node version
- .net

## Start services

### Database

To start database
``` powershell
docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=${secret_MG_password} -d postgres
```

To enter database
```
docker exec -it <container_id> psql -U postgres -W postgres
```


### Backend

You can start it with one of two ways. I usually run it from a docker container, since it replicates the enviroment better. But you can also host it locally.

#### Local
Go to the backend folder.
Run this command in a powershell or in bash
```
dotnet run .
```

#### Docker 
First build the docker image:

Go to the backend folder.

Run this command

```
docker build -t mgamersapi .
```

Now run the image
```
docker run -d -p 5000:8080 --name mgamersapp_container mgamersapi
```

Now you should be able to see it on the port stated

You can change the port 5000 as you see fit, but not 8080 internal port.

localhost:5000/

### Frontend
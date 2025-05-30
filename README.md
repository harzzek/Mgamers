# Mgamers
Udvikling af et online-registreringssystem

## Setup
### Installations needed

- Node version
- .net

### Enviroment variables
ConnectionStrings__DefaultConnection
(Er connection string til databasen. Den definere port, database type, brugernavn og kode)

POSTGRES_PASSWORD
(Database kode skal være det samme som i ConnectionStrings)

JWT__SigningKey
(SLAM YOUR HEAD AGAINST THE KEYBOARD!!!!!! Seriøst jeg mener det, den skal være lang og komplikeret. Endelig brug symboler)

SMTP_SENDERPASSWORD
(Vi bruger google konto email i denne applikation. Fordi alt andet vil være for dyrt eller besværligt. Senere kan vi integere en SMTP server til behandling af emails. Jeg er ikke "just" glad for nuværende løsning)

ASPNETCORE_ENVIROMENT
(Angiver enviromentet. På din egen pc er det nok bedst at bruge Development, bare behold denne værdi som produktion for at kunne adskille, hvis senere versioner har brug for det. Pipelines vil være nice)

NEXT_PUBLIC_DOMAIN_IP
(Angiver hvor frontenden skal finde backenden. Sæt denne til domænet "mgamers.dk" eller til ip "xx.xx.xx.xx:port")

## Start services

### Database

Go to the database subfolder under database/scripts

To start database
``` powershell
docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=${env:secret_MG_password} -d postgres
```

To send script to database container
```
docker cp <file> <container_name>:<path_on_container>
```

Run script on container
```
docker exec -it <container_id> psql -U postgres -d postgres -f /Initial_setup.sql
```

To enter database
```
docker exec -it <container_id> psql -U postgres -W postgres
```

#### UPDATED DATABASE MIGRATIONS
When you change models use the following

To use Microsoft Identity

```
dotnet ef migrations remove
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Just so i dont have to deal with all the hashing.

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

You can change the port 5000 as you see fit, but not the internal port.

localhost:5000/

### Frontend

#### Local

Go to the frontend folder and read the README attached to that project.

#### Docker
build the docker image:
```
docker build -t mgamerswebapp .
docker run -d -p 5000:8080 --name mgamersWeb my-nextjs-app
```

Once build run the container for port 5000.

### Mail server

The production enviroment the users do not need to confirm themselves through mail service yet.

The development server uses mailhog to mime a user confirmation of their account.
Run the following:
```
docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
```
## Testing

For testing the application we use XUnit.
Its placed within /backend.test.

Go to the folder and run:
```
dotnet test
```

## Deployment

### .env file
Contains project wide configs. ALWAYS CHANGE THE KEYS AND PASSWORDS FOR GODS SAKE.
AND FOR GODS SAKE! Don't commit this file with the new values.

All needed values are centralized here for easier deployment

#### Enviroment variables


### Steps after setting enviroment variables
Deployment steps:

1: go into folder /Mgamers/backend

2: ``` dotnet clean ```

3: ``` dotnet build ```

4: ``` docker build -t mgamersapi . ```

5: go into folder /Mgamers/frontend/mgamerswebapp

6: ``` npm install ```

7: ``` npm run build ```

8: (IF errors found then fix, usually unused parameters... Keep code clean, because nextjs is racist)

9: ``` docker build -t mgamerswebapp . ```

10: go into root /Mgamers

11: ``` docker compose up ```






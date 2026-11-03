# Coffee Bar ADM
MEAN stack application used as an example to explain Docker development suite.

### Package manager
For this project i manage the modules using [Bun](https://bun.sh/) a fast Javascript runtime and toolkit, similar to `npm`.

### Database
I use [MongoDB](https://www.mongodb.com/) a non-relational DBMS.

### Backend
I use Typescript with [Mongoose](https://mongoosejs.com/docs/) Schema difiner and [Express.js](https://expressjs.com/) to expose and define the REST API endpoints.

### Frontend
I use [Angular](https://angular.dev/overview): a scalable and mantainable Typescript framowork. 

### Environment
These are the variables used in the `.env` file.

```dotenv
MONGO_HOST=...
MONGO_PORT=...
MONGO_DATABASE=...
MONGO_USER=...
MONGO_PASSWORD=...
```
These variables are involved both in the backend database configuration `backend/src/config/db.ts` and also in the Docker compose file `docker-compose.yml` to make the db and backend containers be able to expose and connect the database.

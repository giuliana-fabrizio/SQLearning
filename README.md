# **SQLearning**

SQLearning is an application designed to train users in performing SQL queries. It offers multiple databases (DBs) accompanied by specific questions for each.

<br>

## 1.1°/ Application structure

The application is structured around three profiles:
- public (users who are not logged in) ;
- users ;
- administrators.

The two latter require authentication. Authentication is done with tokens.

<br>

### `Architecture`

The project has a *Node.JS* backend and a *VUE.JS* frontend. Each directory requires an `.env` file.

- **Backend** : will query the SQLite database. The files are organized according to the **RCS** model: Router-Controller-Services. The queries used by the services are located in the `/query` directory.
- **Frontend** : will query the server. For authentication, it will query `firebase` to save the user's email address and password, verify the credentials and reset the password.

<br>
<br>

## 1.2°/ Set-up

### `Prerequisites`

- **Node.JS** : v20.16.0
- **npm** : v10.8.1

Ensure you have two `.env` file configured with the following variables :

**Backend :**
- *PORT* : the port on which the application will run ;
- *SWAGGER_PORT* : the port for Swagger documentation.

**Frontend :**
- *VUE_APP_SERVER_PORT* : the port on which the server will run.


<br>

### `Backend`

To set up the backend, run the following commands in a command shell :  

1. **Install dependencies** :
    ```bash
    cd back
    npm install
    ```

2. **Start the development server** :
    ```bash
    npm start
    ```

You can access the swagger documentation with the following link : [http://127.0.0.1:SERVER_PORT/api-docs/](http://127.0.0.1:SERVER_PORT/api-docs/).

<br>

### `Frontend`

To set up the frontend, run the following commands in a second command shell :  

1. **Install dependencies** :
    ```bash
    cd front
    npm install
    ```

2. **Start the development server** :
    ```bash
    npm run serve
    ```

3. **Build for production** :
    ```bash
    npm run build
    ```

Now you can access to the frontend with the following link : [http://localhost:8080/](http://localhost:8080/).

<br>
<br>

## 1.3°/ Notes

Make sure both backend and frontend servers are running for full functionality.
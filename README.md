# **SQLearning**

SQLearning is an application designed to train users in performing SQL queries. It offers multiple databases (DBs) accompanied by specific questions for each.

<br>

## SETUP

### `Prerequisites`

- **Node.js** : v20.16.0
- **npm** : v10.8.1

Ensure you have a `.env` file configured with the following variables :
- *PORT* : the port on which the application will run ;
- *SWAGGER_PORT* : the port for Swagger documentation.


<br>

### `Backend`

To set up the backend, run the following commands :  

1. **Install dependencies** :
    ```bash
    cd back
    npm install
    ```

2. **Start the development server** :
    ```bash
    npm start
    ```

<br>

### `Frontend`

To set up the frontend, run the following commands :  

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

<br>

### `Customize configuration`

See [Configuration Reference](https://cli.vuejs.org/config/).
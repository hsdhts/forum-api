# Forum API  
Forum API is a submission to finished class "Become Developer Expert" from Dicoding Indonesia.

## Main Feature
### 1. Threads <br>
   To create another topic, organize it, and focus on one conversation in a forum.
### 2. Comments <br>
   After creating a topic in a thread, users can add comments to express and provide feedback so as to create flexibility in a forum.

## Technology Architecture

### 
- Node JS
- Hapi JS Framework
- Postman
- Swagger
- PostgreSQL
- Github Action (AWS EC2)

  
##  Developer
- [Husada Hutasoit](https://github.com/husadahts)          

## Future Feature
1. Replies Comments
2. Likes Comments


The service available:
> Base url of this service is: http://localhost:5000/

# Authentications

This service utilizes token-based authentication, requiring users to have an account for accessing its features. If you don't have an account, please create a new one. Once registered, you can generate an authentication token. This token serves as a means of logging in, requiring you to authenticate yourself using your email and password. If the authentication is successful, you will receive an access token, enabling you to access the service. If the authentication fails, an error message will be displayed.

The provided tokens are the accessToken and refreshToken. The refreshToken is used for token refreshing purposes. The accessToken remains valid for one hour. To refresh the token, you must send the refreshToken to the service. If the refreshToken is valid, a new accessToken will be provided. If the refreshToken is invalid, an error message will be returned.

By following this authentication process, you can securely access the service and enjoy its functionalities.

# Instructions
This project run in node js version 18.13.0. 
1. Install all dependencies with
```bash
npm install
```
2. Open the `.env.example file` in the root directory of your project
```bash
# HTTP SERVER
HOST=YOUR_HOST_SERVER
PORT=YOUR_PORT_SERVER

# POSTGRES
PGHOST=YOUR_POSTGRES_HOST
PGUSER=YOUR_POSTGRES_USERNAME
PGDATABASE=YOUR_POSTGRES_DATABASE
PGPASSWORD=YOUR_POSTGRES_PASSWORD
PGPORT=YOUR_POSTGRES_PORT

# POSTGRES TEST
PGHOST_TEST=YOUR_POSTGRES_USERNAME_TEST
PGUSER_TEST=YOUR_POSTGRES_POSTGRES_TEST
PGDATABASE_TEST=YOUR_POSTGRES_DATABASE_TEST
PGPASSWORD_TEST=YOUR_POSTGRES_PASSWORD_TEST
PGPORT_TEST=YOUR_POSTGRES_PORT_TEST

# TOKENIZE
ACCESS_TOKEN_KEY=YOUR_POSTGRES_ACCESS_TOKEN_KEY_TEST
REFRESH_TOKEN_KEY=YOUR_POSTGRES_REFRESH_TOKEN_KEY_TEST
ACCCESS_TOKEN_AGE=YOUR_POSTGRES_ACCESS_TOKEN_KEY_TEST

```
   
3. Copy and paste `.env.example` file into `.env` file in your project 
4. Create config/database/test.json to configuration of database test
```bash 
mkdir config/database/test.json  
```
```bash
{
  "user": YOUR_USER_POSTGRES,
  "password": YOUR_PASSWORD_POSTGRES,
  "host": YOUR_HOST_POSTGRES,
  "port": YOUR_PORT_POSTGRES,
  "database": YOUR_DATABASE_POSTGRES
}

```

5. Run server:
<P>-development<p>

```bash
npm run start-dev
```
<p>-production<p>

```bash 
npm run start  
```

### Dependency

* [Hapi JS](https://www.npmjs.com/package/hapijs)
* [JWT](https://www.npmjs.com/package/jsonwebtoken)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [DotEnv](https://www.npmjs.com/package/dotenv)
* [Joi](https://www.npmjs.com/package/joi)
* [Nanoid](https://www.npmjs.com/package/nanoid)
* [pg](https://www.npmjs.com/package/pg)
* [sinon](https://www.npmjs.com/package/sinon)
* [swagger API](https://www.npmjs.com/package/hapi-swagger)

# Pull Requests

I'd be happy to review any pull requests that may better the forum API project, in particular if you have a bug fix, enhancement, or a new idea, you can contact us.

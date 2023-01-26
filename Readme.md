# Packages

## Dependencies

```
"@types/pg": "^8.6.6",
    "bcrypt": "^5.1.0",
    "db-migrate": "^0.11.13",
    "db-migrate-pg": "^1.2.2",
    "dotnet": "^1.1.4",
    "express": "^4.18.2",
    "global": "^4.4.0",
    "jasmine": "^4.5.0",
    "jasmine-spec-reporter": "^7.0.0",
    "jasmine-ts": "^0.4.0",
    "jsonwebtoken": "^9.0.0",
    "node-gyp": "^9.3.1",
    "pg": "^8.8.0",
    "yarn": "^1.22.19"
```

## DevDependencies

```
"@types/bcrypt": "^5.0.0",
    "@types/bcryptjs": "^2.4.2",
    "@types/express": "^4.17.15",
    "@types/jasmine": "^4.3.1",
    "@types/jsonwebtoken": "^9.0.1",
    "@types/node": "^18.11.18",
    "body-parser": "^1.20.1",
    "dotenv": "^16.0.3",
    "nodemon": "^2.0.20",
    "ts-node": "^10.9.1",
    "tsc-watch": "^6.0.0",
    "typescript": "^4.9.4"
```

# Scripts

    1.for testing using jasmine `npm run test `
    2.for starting server with express `npm run start`

# Database

## Envirnoment

### Testing

```
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "shopping_test",
    "user": "shopping_user",
    "password": "123"
```

### Dev

```
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "shopping",
    "user": "shopping_user",
    "password": "123"
```

## Port

> Port:3000

## Environment variables

```
  POSTGRES_HOST=127.0.0.1
  POSTGRES_USER=shopping_user
  POSTGRES_DB=shopping
  POSTGRES_TEST_DB=shopping_test
  POSTGRES_PASSWORD=123
  ENV=dev
  BCRYPT_PASSWORD=i-love-shopping
  SALT_ROUNDS=10
  TOKEN_SECRET=its-a-secret
```

## database setup instructions

### Create user

`CREATE USER shopping_user WITH PASSWORD '123';`

### Create database

````CREATE DATABASE shopping;
   CREATE DATABASE shopping_test;
```

### user privileges

```GRANT ALL PRIVILEGES ON shopping TO shopping_user;
   GRANT ALL PRIVILEGES ON shopping_test TO shopping_user;
````

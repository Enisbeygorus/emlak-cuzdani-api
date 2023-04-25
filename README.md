# real-estate-node-api

A node js api for to do CRUD operations with customer posts about real estates. MongoDB is used As database.

## Steps

## PART I: Download & Build on local

## From github

### 1) Clone the repository, install node packages and verify routes locally

```
//on local
git clone https://github.com/Enisbeygorus/emlak-cuzdani-api
cd emlak-cuzdani-api
npm install
npm start
```

Open your local browser and you can access the following endpoints
`http://localhost:3000/api/v1/auth`  
`http://localhost:3000/api/v1/posts`  
`http://localhost:3000/api/v1/stores`  
`http://localhost:3000/api/v1/customerPosts`

### 2) Create .env file

Create .env file in root folder. You need to define following variables:

```
MONGO_URI=<mongodb-url>
JWT_LIFETIME=20d
JWT_SECRET=<your-secret>
```

### 2) Start server

To start development:

```
npm run dev
```

To start prod:

```
npm run start
```

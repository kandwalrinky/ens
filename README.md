# ENS Assignment

-  Used Node Js , Mongodb ,Express Js, Typescript
-  For validation used express validator
-  For token generate , Authentication & Authorization used JsonwebToken

# API




# Project Setup

To setup the project, all you need to do is
`npm run build`

`npm run dev`

# DB

This project uses mongodb to connect and execute queries on DB. It is configured to use mongoose as its database. change mongouri to env & envdev file

# ENV

NODE_ENV = development
SERVER_PORT = 3030
HOST = localhost
MONGO_URI ="mongodb://localhost:27017/ens"
JWT_TOKEN_SECRET = CC0A6A9D1A9D8DAE855510B40F5ACE5459E867B1CAE98B68F194A401923AE45C
JWT_TOKEN_EXPIRE = '3650d'


## API Docs -- check on postman

#NOTE - .env and .envdev file must be in root directory project and can copy above variable to that file

### REGISTER API

   URL : http://localhost:3030/api/v1/register
   Method : POST
   body request : {
    "firstName": "rinky",
    "lastName": "sharma",
    "email": "rinky22.k@gmail.com",
    "password":"RinkySharma@123",
    "role": "user",
    "contactNumber": 9718724669
   }


  # RESPONSE
     -  {
    "status": true,
    "code": 200,
    "data": {
        "firstName": "rinky",
        "lastName": "sharma",
        "email": "rinky.k@gmail.com",
        "password": "653d69b8738c76407b3ee0d836e595fd83b555d2",
        "role": "admin",
        "contactNumber": "9718724669",
        "_id": "65fd678fc9f5836069224746",
        "createdAt": "1970-01-20T19:18:25.935Z",
        "updatedAt": "1970-01-20T19:18:25.935Z",
        "__v": 0
    },
    "request_id": "4181_eff98756-e72b-46cc-9834-2297ddf216b7_5742"
   }

### LOGIN API
   
   URL : http://localhost:3030/api/v1/login
   Method : POST
   body Request  : {
    "email": "rinky22.k@gmail.com",
    "password":"RinkySharma@123"
    }

  NOTE -- It will generate token , which passed in all rest apis in bearer token in authorization.below

  # RESPONSE -
  {
    "status": true,
    "code": 200,
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmQ2NzhmYzlmNTgzNjA2OTIyNDc0NiIsImVtYWlsIjoicmlua3kua0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTExMDU5NjIsImV4cCI6MjAyNjQ2NTk2Mn0.ABUm4lW3HiBkrvNhAUue3qeBLdwGr4PmqbnYzJjZLtQ",
        "access_token_type": "Bearer",
        "access_expires_in": "3650d"
    },
    "request_id": "183_ada2953e-9a2c-44ad-8263-f87f02635d39_9710"
   }



### CREATE BOOK API


   URL : http://localhost:3030/api/v1/create-book
   Method : POST
   body Request  : {
    "book_name": "node3",
    "author": "test3"  
   }

NOTE : Authorization - passed token in authorization


 # RESPONSE- {
    "status": true,
    "code": 200,
    "data": {
        "book_name": "node3",
        "author": "test3",
        "userid": "65fd5bf132966c76e0c9f608",
        "deleted": 0,
        "_id": "65fd68b8a6f18a51f8e81cf4",
        "createdAt": 1711106232,
        "updatedAt": 1711106232,
        "__v": 0
    },
    "request_id": "3168_68a098dc-b592-4dd6-8409-67b2156aa631_3631"
 }

### UPDATE BOOK API

   URL : http://localhost:3030/api/v1/update-book/65fd4b6589fcdea3f42ff8be
   Method : PUT
   body Request  : {
    "book_name": "node3",
    "author": "test3"  
   }

Note : Pass book Id in params or in url like 65fd4b6589fcdea3f42ff8be


# RESPONSE- {
    "status": true,
    "code": 200,
    "data": {
        "book_name": "node3",
        "author": "test3",
        "userid": "65fd5bf132966c76e0c9f608",
        "deleted": 0,
        "_id": "65fd68b8a6f18a51f8e81cf4",
        "createdAt": 1711106232,
        "updatedAt": 1711106232,
        "__v": 0
    },
    "request_id": "3168_68a098dc-b592-4dd6-8409-67b2156aa631_3631"
 }



### DELETE BOOK API 

   URL : http://localhost:3030/api/v1/delete-book/65fd67283f3274a7f1a87360
   Method : DELETE


   RESPONSE -- {
    "status": true,
    "code": 200,
    "data": "Record Deleted Successfully!",
    "request_id": "4722_76a54c82-cee5-4055-a25e-ea0ae674decb_8224"
}


Note : Pass book Id in params or in url like 65fd67283f3274a7f1a87360

## LIST BOOK API

   URL : http://localhost:3030/api/v1/update-book/65fd4b6589fcdea3f42ff8be
   Method : GET


   RESPONSE -- {
    "status": true,
    "code": 200,
    "data": [
        {
            "_id": "65fd68b8a6f18a51f8e81cf4",
            "book_name": "node3",
            "author": "test3",
            "createdAt": 1711106232,
            "updatedAt": 1711106232
        }
    ],
    "request_id": "1216_d5ce1bc9-a0b8-47c9-b3fa-a703d4ecf29a_2612"
}



#### Similarly CRUD Operations for TASK API -just pass variable task_name


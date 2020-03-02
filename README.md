# FCM-testing

## Installing: 
  - Install redis and run local! Data will save in redis.
  - Install node, npm.
## Start:
  - Step 1: start redis local.
  - Step 2: cd /server --> run command: 
    + npm i
    + npm start: server running in port 8000
  - Step 3: cd /client --> run command:
    + npm i
    + npm run serve: client running in http://localhost:8080
## Test:
  - In Web page http://localhost:8080
    + Input your name and genarate token with google firebase 
      -> token will send server and save in redis with your name.
    + After that input title, body will show notify and the name who will receive 
      -> send server will check in redis and get token did genarate and send google firebase send him.
    

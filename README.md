# LAUNCHBOT

A bot to build a launch list by sharing invites and ranking users to earn early access.



#### SETUP 

1. Register the bot with Microsoft

   Create a bot on https://dev.botframework.com and follow the steps to setup
   a Facebook channel. 

2. Register the app with Facebook

   The Facebook channel config page will walk you through creating a Facebook page & app for your bot.



#### RUNNING THE BOT

1. Git clone this repository into a folder

2. Run `npm install`

3. Install then run `redis-server`

4. Download and install the Bot Framework Emulator

5. Or, install and run ngrok using `ngrok http 3978`

   For the endpoint you setup on dev.botframework.com, copy the https link ngrok setup and set `<ngrok link>/api/messages` as your bots endpoint.

6. Run the node app

   In a separate console window set BOTFRAMEWORK_APPID and BOTFRAMEWORK_APPSECRET
   and run `node app.js

7. Go to http://localhost:3978/ to see the dashboard



#### DEPLOY

1. Create a Heroku account with `heroku apps:create` and add on redis.
2. Push repo to Heroku and set up redis



#### API

Rank [GET] - requires the userid, first_name, last_name

Verify [GET] - requires userid

Lookup [GET] - requires userid

Remove [GET] - requires userid

Messages [POST] - Sends and receives messages from chat platforms to Microsoft
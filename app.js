var restify = require('restify')
var builder = require('botbuilder')
var dialogs = require('./dialogs')
// https://github.com/klughammer/node-randomstring

// create bot and add dialogs
var launchBot = new builder.BotConnectorBot({
	appId: 'YourAppId', // process.env.appId  // 3979895f0c004678b344d0c5da3450cb
	appSecret: 'YourAppSecret' // process.env.appSecret // 268cd3aa23e14f63a50081c4c3fc2421
})

launchBot.add('/', dialogs);



// setup on heroku
// https://elements.heroku.com/addons/rediscloud

// save to redis
// https://github.com/bredele/node-invite/blob/master/index.js

// dashboard
// https://coligo.io/real-time-analytics-with-nodejs-socketio-vuejs/


// setup restify server
var server = restify.createServer()

function respond(req, res, next) {
	res.send('hello world')
}

server.get('/', respond)

server.post('/api/messages', launchBot.verifyBotFramework(), launchBot.listen())

server.listen(process.env.PORT || 5000, function () {
	console.log('%s listening to %s', server.name, server.url)
})

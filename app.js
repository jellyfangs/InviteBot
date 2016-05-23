var restify = require('restify')
var builder = require('botbuilder')
var index = require('./dialogs/index')
var prompts = require('./prompts')
// https://github.com/klughammer/node-randomstring

// create bot and add dialogs
var launchBot = new builder.BotConnectorBot({
	appId: 'launchbottest', // process.env.appId  // launchbottest
	appSecret: '3979895f0c004678b344d0c5da3450cb' // process.env.appSecret // 3979895f0c004678b344d0c5da3450cb
})

index.addDialogs(launchBot, function (message, newConvo) {
	console.log('got a message')
	if (newConvo) {
		return {
			to: message.from,
			from: message.to
		}
	} else {
		return {
			to: message.to,
			from: message.from,
			conversationId: message.conversationId,
			channelConversationId: message.channelConversationId,
			channelMessageId: message.channelMessageId
		}
	}
})

// setup restify server
var server = restify.createServer()

function respond(req, res, next) {
	res.send('hello world')
}

server.get('/', respond)

var invites = require('./invites/index')

server.get('/invites', function (req, res) {
  res.send('invites go here')
})

var boards = require('./boards/index')

server.get('/leaderboard', function (req, res) {
  res.send('leaderboard go here')
})

// server.get('/leaderboard', boards)

server.post('/api/messages', launchBot.verifyBotFramework(), launchBot.listen())

server.listen(process.env.PORT || 5000, function () {
	console.log('%s listening to %s', server.name, server.url)
})

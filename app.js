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




// launchBot.add('/', new builder.CommandDialog()
// 	.matches('^(hello|yo|hi|hey|help)', builder.DialogAction.send(welcomeActions))
// 	.matches('^(yes)', builder.DialogAction.beginDialog('/createCode'))
// 	.matches('^(code)', builder.DialogAction.beginDialog('/verifyCode'))
// 	.matches('^(no|nevermind)', builder.DialogAction.beginDialog('/noCode'))
// 	.matches('^(optin)', builder.DialogAction.beginDialog('/optin'))
// 	.matches('^(bye|quit)', builder.DialogAction.endDialog(prompts.endMessage))
// 	.onDefault(builder.DialogAction.send(prompts.defaultMessage)))

// launchBot.add('/createCode', [
// 	function (session) {
// 		session.send(prompts.getCodeMessage1);
// 		session.send(prompts.getCodeMessage2);
// 	},
// 	function (session, results) {
// 		session.send(prompts.endMessage);
// 		// session.endDialog()
// 	}
// ])

// launchBot.add('/verifyCode', [
// 	function (session) {
// 		session.send(haveCodeActions);
// 	},
// 	function (session, results) {
// 		session.send(prompts.sendCodeMessage1);
// 		session.send(prompts.sendCodeMessage2);
// 	},
// 	function (session, results) {
// 		session.send(prompts.endMessage);
// 		// session.endDialog()
// 	}
// ])

// launchBot.add('/noCode', [
// 	function (session) {
// 		session.send(noCodeActions);
// 	},
// 	function (session, results) {
// 		session.send(prompts.endMessage);
// 		// session.endDialog()
// 	}
// ])

// launchBot.add('/optin', [
// 	function (session) {
// 		session.send(prompts.endMessage);
// 		session.endDialog()
// 	}
// ])


// function haveCode(session, args) {
// 	codeSuccess(session)
// }

// function noCode(session, args) {
// 	session.send(prompts.noCodeMessage);
// }

// function codeSuccess(session) {
// 	session.send(prompts.sendCodeMessage1);
// 	session.send(prompts.sendCodeMessage2);
// }

// function codeFail(session) {
// 	session.send(prompts.codeFailMessage1);
// 	session.send(prompts.codeFailMessage2);
// }


// save to redis
// https://elements.heroku.com/addons/rediscloud

// invite system
// https://github.com/bredele/node-invite/blob/master/index.js
// https://github.com/eelogic/nodebb-plugin-invitation-code/blob/master/lib/invitation.js

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

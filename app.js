var restify = require('restify')
var builder = require('botbuilder')
var dialogs = require('./dialogs')
var prompts = require('./prompts')
// https://github.com/klughammer/node-randomstring

// create bot and add dialogs
var launchBot = new builder.BotConnectorBot({
	appId: 'launchbottest', // process.env.appId  // launchbottest
	appSecret: '3979895f0c004678b344d0c5da3450cb' // process.env.appSecret // 3979895f0c004678b344d0c5da3450cb
})


var welcomeActions = {
        "type": "Message",
        "attachments": [
            {
               "text": prompts.welcomeMessage,
                "actions": [
                    {
                        "title": "Yes!",
                        "message": "CB"
                    },
                    {
                        "title": "I have a secret code :)",
                        "message": "F"
                    }
                ]
            }
        ]
    }


launchBot.add('/', new builder.CommandDialog()
	.matches('^(hello|yo|hi|hey)', builder.DialogAction.send(welcomeActions))
	.matches('^(yes)', builder.DialogAction.beginDialog('/createCode'))
	.matches('^(code)', builder.DialogAction.beginDialog('/verifyCode'))
	.matches('^(no|nevermind)', builder.DialogAction.beginDialog('/noCode'))
	.matches('^(burgers)', builder.DialogAction.beginDialog('/burgers'))
	.onDefault(function (session) {
		session.send('hey')
	}))


launchBot.add('/burgers', [
	function (session) {
		session.send(msgActions)
	},
	function (session, results) {
		sessin.endDialog()
	}
])

launchBot.add('/createCode', [
	function (session) {
		session.send(prompts.getCodeMessage1);
		session.send(prompts.getCodeMessage2);
		session.send(prompts.getCodeMessage3);
	},
	function (session, results) {
		session.endDialog()
	}
])

launchBot.add('/verifyCode', [
	function (session) {
		session.send(prompts.sendCodeMessage1);
		session.send(prompts.sendCodeMessage2);
	},
	function (session, results) {
		session.endDialog()
	}
])

launchBot.add('/noCode', [
	function (session) {
		session.send(prompts.noCodeMessage);
	},
	function (session, results) {
		session.endDialog()
	}
])


function haveCode(session, args) {
	codeSuccess(session)
}

function noCode(session, args) {
	session.send(prompts.noCodeMessage);
}

function codeSuccess(session) {
	session.send(prompts.sendCodeMessage1);
	session.send(prompts.sendCodeMessage2);
}

function codeFail(session) {
	session.send(prompts.codeFailMessage1);
	session.send(prompts.codeFailMessage2);
}


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

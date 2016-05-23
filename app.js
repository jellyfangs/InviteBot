var restify = require('restify')
var builder = require('botbuilder')
var index = require('./dialogs/index')
var prompts = require('./prompts')

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
server.use(restify.queryParser())

// setup redis server
var client = require('redis').createClient(process.env.REDIS_URL)

// hello world
function respond(req, res, next) {
	res.send('hello world')
}

server.get('/', respond)

// create codes
var randomstring = require('randomstring')

function createCode(req, res, next) {
	// gen uid
	var uid = randomstring.generate({
		length: 5,
		charset: 'numeric',
	})
	// gen code
	var invitecode = randomstring.generate({
		length: 6,
		readable: true,
		capitalization: 'uppercase',
	})
	// save to redis
	client.set(invitecode, uid, function (err, res) {
		console.log(res, invitecode, uid)
	})
	// output from server
	res.send(uid + ': ' + invitecode)
}

server.get('/invite', createCode)


// verify codes
function verifyCode(req, res, next) {
	// look up invite code
	client.get(req.query.code, function (err, reply) {
		if (reply) {
			res.send(true)
		} else {
			res.send(false)
		}
	})
}

server.get('/verify', verifyCode)


// list codes
function listCodes(req, res, next) {
	client.keys('*', function (err, keys) {
		if (err) return console.log(err)

		for (var i = 0, len = keys.length; i < len; i++) {
			client.get(keys[i], function (err, reply) {
				console.log(reply)
			})
			console.log(keys[i])
		}
	})
	res.send('list all the codes')
}

server.get('/list', listCodes)

// clear db
function clearDB(req, res, next) {
	client.flushdb(function (err, reply) {
		if (reply) {
			res.send(true)
		} else {
			res.send(false)
			return console.log(err)
		}
	})
}

server.get('/x', clearDB)

// look up ranking
var boards = require('./boards/index')

server.get('/leaderboard', function (req, res) {
  res.send('leaderboard go here')
})


// process microsoft botconnector messages
server.post('/api/messages', launchBot.verifyBotFramework(), launchBot.listen())

// run server
server.listen(process.env.PORT || 5000, function () {
	console.log('%s listening to %s', server.name, server.url)
})

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
server.get('/', function(req, res) {
	var hello = `
		<html>
			<body>
				<ul>
					<li><form action="/verify" method="get"><input type="text" name="code" /><button type="submit">verify code</button></form></li>
					<li><a href="/invite">Get invite code</a></li>
					<li><a href="/list">List all codes</a></li>
					<li><a href="/users">List all users</a></li>
					<li><a href="/rankings">Get leaderboard</a></li>
					<li><form action="/rank" method="get"><input type="text" name="user" /><button type="submit">add new user</button></form></li>
					<li><form action="/rankup" method="get"><input type="text" name="user" /><button type="submit">rank up user</button></form></li>
					<li><form action="/getscore" method="get"><input type="text" name="user" /><button type="submit">get score of user</button></form></li>
					<li><form action="/getrank" method="get"><input type="text" name="rank" /><button type="submit">get ranking</button></form></li>
					<li><form action="/remove" method="get"><input type="text" name="user" /><button type="submit">remove user</button></form></li>
					<li><a href="/x">Clear database</a></li>
				</ul>
			</body>
		</html>
	`
	res.end(hello)
})

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
	res.json(invitecode)
}

server.get('/invite', createCode)


// verify codes
function verifyCode(req, res, next) {
	// look up invite code
	client.get(req.query.code, function (err, reply) {
		console.log(reply)
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

		// for (var i = 0, len = keys.length; i < len; i++) {
		// 	client.get(keys[i], function (err, reply) {
		// 		res.send(reply)
		// 	})
		// 	res.send(keys[i])
		// }
		res.send(keys)
	})
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



// total rank
var Leaderboard = require('leaderboard')
var rankings = new Leaderboard('rankings', null, client)

server.get('/rankings', function (req, res) {
	rankings.list(function(err, reply) {
		res.send(reply)
	})
})

// add new rank
server.get('/rank', function (req, res) {
	rankings.add(req.query.user, 1, function(err, reply) {
		 res.send('now ranking ' + req.query.user)
	})
})

// move up rank
server.get('/rankup', function (req, res) {
  rankings.incr(req.query.user, 1, function(err, reply) {
		res.send('ranked up user: ' + req.query.user)
	})
})

// get score
server.get('/getscore', function (req, res) {
  rankings.score(req.query.user, function(err, score) {
		res.send('user: ' + req.query.user + ' score: ' + score.toString())
	})
})

// get rank
server.get('/getrank', function (req, res) {
   rankings.at(req.query.rank-1, function(err, user) {
		res.send(user)
	})
})

// remove rank
server.get('/remove', function (req, res) {
	rankings.rm(req.query.user, function(err, removed) {
	  res.send(removed)
	})
})


// process microsoft botconnector messages
server.post('/api/messages', launchBot.verifyBotFramework(), launchBot.listen())

// run server
server.listen(process.env.PORT || 5000, function () {
	console.log('%s listening to %s', server.name, server.url)
})

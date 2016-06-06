var restify = require('restify')
var builder = require('botbuilder')
var index = require('./dialogs/index')
var prompts = require('./prompts')
var randomstring = require('randomstring')

// ranking system
var Leaderboard = require('leaderboard')
var rankings = new Leaderboard('rankings', null, client)

// setup restify server
var server = restify.createServer()
server.use(restify.queryParser())

// setup redis server
var client = require('redis').createClient(process.env.REDIS_URL)
// var client = require('redis').createClient('//localhost:6379')

// create bot and add dialogs
var launchBot = new builder.BotConnectorBot({
	appId: process.env.BOTFRAMEWORK_APPID,
	appSecret: process.env.BOTFRAMEWORK_APPSECRET
	// appId: "launchbottest",
	// appSecret: "3979895f0c004678b344d0c5da3450cb"
})

index.addDialogs(launchBot)


// hello world
server.get('/', function(req, res) {
	rankings.total(function (err, totals) {
		if (err) console.log(err)

		client.scard("optin", function (err, optins) {
			var hello = `
				<html>
					<body>
						<ul>
							<li>${totals} users total / ${optins} opted in, <a href="/rankings">go to leaderboard</a><br><br></li>
							<li>
								<form action="/rank" method="get">
									<input type="text" placeholder="userid" name="userid" />
									<input type="text" placeholder="first_name" name="first_name" />
									<input type="text" placeholder="last_name" name="last_name" />
									<button type="submit">add new user</button>
								</form>
							</li>
							<li>
								<form action="/verify" method="get">
									<input type="text" placeholder="eg. 3KOA5B" name="invitecode" />
									<button type="submit">verify code</button>
								</form>
							</li>
							<li>
								<form action="/lookup" method="get">
									<input type="text" placeholder="userid" name="userid" />
									<button type="submit">look up user</button>
								</form>
							</li>
							<li>
								<form action="/optin" method="get">
									<input type="text" placeholder="userid" name="userid" />
									<button type="submit">optin user</button>
								</form>
							</li>
							<li>
								<form action="/remove" method="get">
									<input type="text" placeholder="userid" name="userid" />
									<button type="submit">remove user</button>
								</form>
							</li>
							<li><a href="/x">Clear database</a></li>
						</ul>
					</body>
				</html>
			`
			res.end(hello)
		})
	})
})


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


server.get('/rankings', function (req, res) {
	rankings.list(function(err, reply) {
		res.send(reply)
	})
})


server.get('/rank', function (req, res) {
	console.log('RANKING: %s %s %s', req.query.userid, req.query.first_name, req.query.last_name)

	// is user in the system?
	client.sismember("users", req.query.userid, function (err, reply) {
		if (err) console.log(err)

		if (reply==0) {

			// add to users set
			client.sadd("users", req.query.userid, function (err, reply) {

				// create a new invite code
				var invitecode = randomstring.generate({
					length: 6,
					readable: true,
					capitalization: 'uppercase',
				})

				// add to invitecodes set
				client.sadd("invitecodes", invitecode, function (err, reply) {
					// set hash map of user_to_code and code_to_user
					client.hset("user_to_code", req.query.userid, invitecode)
					client.hset("code_to_user", invitecode, req.query.userid)

					// set hash of user info
					client.hset("user:%s".replace("%s", req.query.userid), "first_name", req.query.first_name)
					client.hset("user:%s".replace("%s", req.query.userid), "last_name", req.query.last_name)
					client.hset("user:%s".replace("%s", req.query.userid), "invitecode", invitecode)
					client.hset("user:%s".replace("%s", req.query.userid), "optin", true)

					// add to opted in set
					client.sadd("optin", req.query.userid, function (err, reply) {
						// add user to rankings	
						rankings.add(req.query.userid, 1, function (err, reply) {
							if (err) console.log(err)

							// their current rank
							rankings.rank(req.query.userid, function (err, rank) {
								if (err) console.log(err)

								// what's the total
								rankings.total(function (err, totals) {
									if (err) console.log(err)

									// send back response
									var jsondata = {
										user: req.query.userid,
										invitecode: invitecode,
										rank: rank+1,
										totals: totals,
										optin: true
									}
									res.send(jsondata)
								})
							})
						})
					})
				})
			})
		} else {
			client.hgetall("user:%s".replace("%s", req.query.userid), function (err, userinfo) { 
				if (err) console.log(err)

				// their current rank
				rankings.rank(req.query.userid, function (err, rank) {
					if (err) console.log(err)

					// the total ranks
					rankings.total(function (err, totals) {
						if (err) console.log(err)

						userinfo.rank = rank+1
						userinfo.totals = totals

						// send back response
						res.send(userinfo)
					})
				})
			})
		}
	})
})



server.get('/verify', function (req, res) {
	console.log('VERIFYING: %s', req.query.invitecode)

	// is invitecode in the system?
	client.sismember("invitecodes", req.query.invitecode, function (err, reply) {
		if (err) console.log(err)

		if (reply==1) {
			// look up the userid
			client.hget("code_to_user", req.query.invitecode, function (err, userid) {
				if (err) console.log(err)

				// increment their score
				rankings.incr(userid, 1, function (err, reply) {
					if (err) console.log(err)

					// their current rank
					rankings.rank(userid, function (err, rank) {
						if (err) console.log(err)

						// the total rank
						rankings.total(function (err, totals) {
							if (err) console.log(err)

							// look up the user info
							client.hget("user:%s".replace("%s", userid), "first_name", function (err, first_name) {
								var jsondata = {
									user: userid,
									first_name: first_name,
									rank: rank+1,
									totals: totals
								}

								// send back response
								res.send(jsondata)
							})
						})
					})
				})
			})
		} else {
			console.log('INVITE CODE NOT FOUND')
			res.send(404, 'INVITE CODE NOT FOUND')
		}
	})
})


server.get('/lookup', function (req, res) {
	console.log('LOOKING UP: %s', req.query.userid)

	// is user in the system?
	client.sismember("users", req.query.userid, function (err, reply) {
		if (err) console.log(err)

		if (reply==1) {
			// look up the user info
			client.hgetall("user:%s".replace("%s", req.query.userid), function (err, userinfo) { 
				if (err) console.log(err)

				// their current rank
				rankings.rank(req.query.userid, function (err, rank) {
					if (err) console.log(err)

					// the total ranks
					rankings.total(function (err, totals) {
						if (err) console.log(err)

						userinfo.rank = rank+1
						userinfo.totals = totals

						// send back response
						res.send(userinfo)
					})
				})
			})
		} else {
			console.log('USER NOT FOUND')
			res.send(404, 'USER NOT FOUND')
		}
	})
})


server.get('/optin', function (req, res) {
	console.log('OPTING IN: %s', req.query.userid)

	// is user in the system?
	client.sismember("optin", req.query.userid, function (err, reply) {
		if (err) console.log(err)

		if (reply==1) {
			client.hgetall("user:%s".replace("%s", req.query.userid), function (err, userinfo) {
				if (err) console.log(err)

				// user opted out
				client.srem("optin", req.query.userid)
				userinfo.optin = false
				res.send('user opted out')
			})
		} else {
			client.hgetall("user:%s".replace("%s", req.query.userid), function (err, userinfo) {
				if (err) console.log(err)

				// user opted in
				client.sadd("optin", req.query.userid)
				userinfo.optin = true
				res.send('user opted in')
			})
		}
	})
})

server.get('/remove', function (req, res) {
	console.log('REMOVING: %s', req.query.userid)

	// is user in the system?
	client.sismember("users", req.query.userid, function (err, reply) {
		if (err) console.log(err)

		if (reply==1) {
			// look up the user info
			client.hgetall("user:%s".replace("%s", req.query.userid), function (err, userinfo) { 
				if (err) console.log(err)

				// remove from hashes
				client.hdel("user_to_code", req.query.userid)
				client.hdel("code_to_user", userinfo.invitecode)

				// remove from sets
				client.srem("users", req.query.userid)
				client.srem("invitecodes", userinfo.invitecode)

				// remove ranking
				rankings.rm(req.query.userid, function (err, reply) {
					if (err) console.log(err)

					// remove key
					client.hdel("user:%s".replace("%s", req.query.userid), function (err, reply) {
						res.send('user removed')
					})
				})
			})
		} else {
			console.log('USER NOT FOUND')
			res.send(404, 'USER NOT FOUND')
		}
	})
})

// process microsoft botconnector messages
server.post('/api/messages', launchBot.verifyBotFramework(), launchBot.listen())

// run server
server.listen(process.env.API_PORT || 3978, function () {
	console.log('%s listening to %s', server.name, server.url)
})

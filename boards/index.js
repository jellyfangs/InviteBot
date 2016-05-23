// https://github.com/bredele/node-invite
// https://github.com/borbit/node-leaderboard

var client = require('redis').createClient(process.env.REDIS_URL)
var Leaderboard = require('leaderboard')

var board1 = new Leaderboard('rankings', null, client)

// add member in the leaderboard
exports.addUser = function (req, res, next) {
	board.add(user, 1, function(err) {
		// no arguments except err
	})
}

// increment rank
exports.moveUp = function (req, res, next) {
	board.incr(user, 1, function(err) {
		// no arguments except err
	})
}

exports.getScore = function (req, res, next) {
	board.score(user, function(err, score) {
		// score - current score, -1 if a member not in leaderboard
	})
}

exports.getRank = function (req, res, next) {
	board.at(rank, function(err, member) {
		// member - member at specified rank, null if not found
	})
}

// display leaderboard
exports.displayBoard = function (req, res, next) {
	board.list(function(err, list) {
		// list - list of leaders are ordered from highest to lowest
	})
}

exports.removeUser = function (req, res, next) {
	// board.rm(user) {
	// 	// board.rm(user, function(err, removed) {
			
	// 	// })
	// }
}
var builder = require('botbuilder')
var prompts = require('../prompts')

// USER FACING
var intro = require('./intro')
var welcome = require('./welcome')
var verifyCode = require('./verifyCode')
var shareCode = require('./shareCode')
var optout = require('./optout')
var optin = require('./optin')
var video = require('./video')

// ADMIN FACING
var reset = require('./reset')
var leaderboard = require('./leaderboard')
var me = require('./me')

module.exports = {
	addDialogs: addDialogs
}

// triggers loading all the bot dialogs
function addDialogs(bot) {
	bot.add('/', new builder.CommandDialog()
    .matches('^(help)', builder.DialogAction.send(prompts.helpMessage))
    .matches('^(secret)', builder.DialogAction.send(prompts.helpMessage2))
		.matches('^(hello|yo|hi|hey)', '/welcome')
		.matches('^(verify)', '/verifyCode')
		.matches('^(share)', '/shareCode')
		.matches('^(optout)', '/optout')
		.matches('^(optin)', '/optin')
		.matches('^(reset)', '/reset')
		.matches('^(me)', '/me')
		.matches('^(video)', '/video')
		.matches('^(leaderboard)', '/leaderboard')
		.matches('^(bye|quit)', builder.DialogAction.endDialog(prompts.endMessage))
		.onDefault([
			// builder.DialogAction.send(randomDefault())
			function (session, args, next) {
				if (!session.userData.firstRun) {
					session.replaceDialog('/intro')
				} else {
					next()
				}
			},
			function (session, results) {
				session.replaceDialog('/intro')
			}
		])
	)

	// add dialogs for commands
  intro.addDialogs(bot)
  welcome.addDialogs(bot)
	verifyCode.addDialogs(bot)
	shareCode.addDialogs(bot)
	optout.addDialogs(bot)
	optin.addDialogs(bot)
	reset.addDialogs(bot)
	me.addDialogs(bot)
	video.addDialogs(bot)
	leaderboard.addDialogs(bot)
}


function randomDefault() {
	var defaultMessages = [prompts.defaultMessage, prompts.defaultMessage2, prompts.defaultMessage3]
	var randomDefault = defaultMessages[Math.floor(Math.random() * defaultMessages.length)]
	return randomDefault
}

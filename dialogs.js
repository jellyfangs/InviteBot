var builder = require('botbuilder')
var prompts = require('./prompts')

// export command dialog
module.exports = new builder.CommandDialog()
	.matches('^(yes)', builder.DialogAction.beginDialog('/createCode'))
	.matches('^(code)', builder.DialogAction.beginDialog('/verifyCode'))
	.matches('^(no|nevermind)', builder.DialogAction.beginDialog('/noCode'))
	.matches('^(bye|quit)', builder.DialogAction.endDialog(prompts.endMessage))
	.onDefault(builder.DialogAction.send(prompts.defaultMessage))
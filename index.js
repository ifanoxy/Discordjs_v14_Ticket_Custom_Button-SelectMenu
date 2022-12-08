import { IfanoxyBot, Ticket } from './Data.js';
import config from './config.js'
import { ButtonStyle } from 'discord.js';
const IfaBot = new IfanoxyBot()

// Style Liste 
/**
 * ButtonStyle.Primary --> Blue
 * ButtonStyle.Danger --> Red
 * ButtonStyle.Link --> Grey [Beware, it's not the best]
 * ButtonStyle.Secondary --> Grey
 * ButtonStyle.Success --> Green
*/



IfaBot.login(config.token)
.catch(e => console.log(e))
.then(() => {
    IfaBot.initCommands({
    })
})

console.log(`

Le bot est en ligne !

`.gray)
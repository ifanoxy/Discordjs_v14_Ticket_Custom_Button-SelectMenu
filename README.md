# Discordjs_v14_Ticket_Custom_Button-SelectMenu
you want to create your own ticket bot ? This Github Project is made for you ! do your bot very easly

### This small code is an example of Ticket Command, you can adjust it to your sauce !
### Ticket with Button
```javascript

const ButtonTicket = new Ticket('button-ticket')
ButtonTicket
.addButton({
    setName: "Button 1",
    style: ButtonStyle.Danger,
})
.addButton({
    setName: "Button 2",
    style: ButtonStyle.Primary,
    /**
    emojiName: 'MyEmoji',
    emojiId: "123456",
    emojiAnimated: false
    */
})
```
### Ticket with Select Menu
```javascript
const Select_MenuTicket = new Ticket('selectMenu ticket')
Select_MenuTicket
.addSelect_Menu({
    setName: "MySelectMenuTicket",
    placeHolder: "please choose an option",
    options: [
        {
            label: "Option 1",
            description: "this is a small description"
        },
        {
            label: "Option 2",
        },
    ]
})
```
## Where this code Going ?

```javascript
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

// Put your ticket code here

IfaBot.login(config.token)
.catch(e => console.log(e))
.then(() => {
    IfaBot.initCommands({
    })
})

console.log(`

Le bot est en ligne !

`.gray)
```


# Limits
> **Warning**
> You cannot add unlimited button or Select Menu !

> **You are entitled to 5 "lines"**
> 1 lines can contain **5 Buttons** or **1 Select Menu**
> so you can have 25 buttons or 5 select menu or 2 select menu and 15 buttons. 

# How run it ?

```
npm install 
```
insert your bot's token in the 'config.json' file
```
node index.js
```
And it's done ! Your bot is online


> **Note**
> the next update will add the functionality of a custom embed

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

# Limits
> **Warning**
> You cannot add unlimited button or Select Menu !

> **You are entitled to 5 "lines"**
> 1 lines can contain **5 Buttons** or **1 Select Menu**
> so you can have 25 buttons or 5 select menu or 2 select menu and 15 buttons. 
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
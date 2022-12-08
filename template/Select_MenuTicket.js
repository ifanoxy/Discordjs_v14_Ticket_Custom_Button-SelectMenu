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
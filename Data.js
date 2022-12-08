import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, Client, Collection, EmbedBuilder, PermissionsBitField, SelectMenuBuilder, SlashCommandBuilder } from 'discord.js'
import * as fs from 'fs'
import * as colors from 'colors'

export class IfanoxyBot extends Client {

    constructor() {
        super({
            intents: 4609,
        })
        this.commands = new Collection()
        this.on("interactionCreate", async (interaction, client) => {
            switch (true) {
                case interaction.isChatInputCommand() : {
                    const command = this.commands.get(interaction.commandName);
                    if(!command) return interaction.reply('Il y a un problème avec cette commande ! Elle est introuvable');
                    command.execute(interaction, client);
                }
                break;
                case interaction.isButton() : {
                    if(interaction.customId == "Ticket_Delete"){
                        const chan = interaction.guild.channels.cache.get(interaction.channelId);
                    
                        interaction.reply({
                          content: 'Fermeture du ticket...'
                        })
                        .then(() => {
                            chan.delete().catch((err) => {console.log(err)})
                        })
                        break;
                    }
                    const CI = interaction.customId.split('_');
                    const name = CI[0];
                    const TicketName = CI[1];
                    var allParent = interaction.guild.channels.cache.filter(w  => w.type == ChannelType.GuildCategory).map(x => x)
                    let parent;
                    for (let oneParent of allParent) {
                        if(oneParent.name == TicketName) {
                            parent = oneParent;
                            break;
                        }
                    }
                    if(parent == undefined) {
                        parent = interaction.guild.channels.create({
                            name: TicketName,
                            type: ChannelType.GuildCategory,
                            permissionOverwrites: [{
                                id: interaction.guild.roles.everyone,
                                deny: [PermissionsBitField.Flags.ViewChannel],
                            }]
                        })
                    }
                    
                    console.log(`[Ticket]`.magenta + ` Nouveau ticket de ${interaction.user.tag}`.green)
                    interaction.guild.channels.create({
                        name: `${interaction.member.user.username}-${name}`,
                        parent: await parent,
                        type: ChannelType.GuildText,
                        topic: interaction.message.id,
                        permissionOverwrites: [{
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory],
                          },
                          {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                          },
                        ],  
                    })
                    .then(channel => {
                        const crtembed = new EmbedBuilder()
                            .setAuthor({iconURL: interaction.user.avatarURL(), name: `Ticket de ${interaction.member.user.username}`})
                            .setDescription(`**Bien le bonjour ${interaction.user.username} !**\n Vous venez de créer un ticket pour la raison **${name}**.`)
                            .setTimestamp()
                            .setColor('Navy')
                            .setFooter({text: `Ticket système`})
                        const sup = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setCustomId('Ticket_Delete')
                                .setLabel('Fermer le Ticket')
                                .setStyle(ButtonStyle.Danger),
                            )
                        channel.send({content: `<@!${interaction.user.id}>`,embeds: [crtembed], components: [sup]})
                        interaction.reply({embeds: [new EmbedBuilder().setColor("Blurple").setDescription(`Votre ticket à été créé ! <#${channel.id}> Il a été créer dans la catégorie <#${channel.parentId}>`)],ephemeral: true})
                    });
                }
                break;
                case interaction.isSelectMenu() : {
                    const CI = interaction.customId.split('_');
                    const name = interaction.values[0].split('_')[0];
                    const TicketName = CI[1];
                    var allParent = interaction.guild.channels.cache.filter(w  => w.type == ChannelType.GuildCategory).map(x => x)
                    let parent;
                    for (let oneParent of allParent) {
                        if(oneParent.name == TicketName) {
                            parent = oneParent;
                            break;
                        }
                    }
                    if(parent == undefined) {
                        parent = interaction.guild.channels.create({
                            name: TicketName,
                            type: ChannelType.GuildCategory,
                            permissionOverwrites: [{
                                id: interaction.guild.roles.everyone,
                                deny: [PermissionsBitField.Flags.ViewChannel],
                            }]
                        })
                    }
                    
                    console.log(`[Ticket]`.magenta + ` Nouveau ticket de ${interaction.user.tag}`.green)
                    interaction.guild.channels.create({
                        name: `${interaction.member.user.username}-${name}`,
                        parent: await parent,
                        type: ChannelType.GuildText,
                        topic: interaction.message.id,
                        permissionOverwrites: [{
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory],
                          },
                          {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                          },
                        ],  
                    })
                    .then(channel => {
                        const crtembed = new EmbedBuilder()
                            .setAuthor({iconURL: interaction.user.avatarURL(), name: `Ticket de ${interaction.member.user.username}`})
                            .setDescription(`**Bien le bonjour ${interaction.user.username} !**\n Vous venez de créer un ticket pour la raison **${name}**.`)
                            .setTimestamp()
                            .setColor('Navy')
                            .setFooter({text: `Ticket système`})
                        const sup = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setCustomId('Ticket_Delete')
                                .setLabel('Fermer le Ticket')
                                .setStyle(ButtonStyle.Danger),
                            )
                        channel.send({content: `<@!${interaction.user.id}>`,embeds: [crtembed], components: [sup]})
                        interaction.reply({embeds: [new EmbedBuilder().setColor("Blurple").setDescription(`Votre ticket à été créé ! <#${channel.id}> Il a été créer dans la catégorie <#${channel.parentId}>`)],ephemeral: true})
                    });
                }
                break;
            }
        })
    }

    async initCommands() {
        const filesData = fs.readdirSync('./dataStorage').filter(f => f.endsWith('.json'))
        var ArrayCmd = [];
        for(const file of filesData) {
            const data = JSON.parse(fs.readFileSync(`./dataStorage/${file}`))
            const cmd = new SlashCommandBuilder()
            let i = 0
            var cmt = []

            cmd.setName((file.replace('.json', '')).toString())
            cmd.setDescription("Send Ticket message")

            ArrayCmd.push(cmd.toJSON());
            const all = {
                data: cmd,
                execute(interaction, client) {
                    let embedTicket = new EmbedBuilder().setDescription('Vous rencontrez un problème ?\nCréer un ticket en choisissant la bonne catégorie !\n')
                    for(const ActionRow of data) {
                        if(ActionRow.length == 0)break;
                        const row = new ActionRowBuilder()
                        for(const Component of ActionRow) {
                            if(Component.type == "Button"){
                                if(Component.emoji.name !== null) {
                                    row.addComponents(
                                        new ButtonBuilder()
                                        .setCustomId(`${Component.label}_${cmd.name}_${i}`)
                                        .setLabel(`${Component.label}`)
                                        .setStyle(ButtonStyle[`${Component.style}`])
                                        .setEmoji({
                                            name: Component.emoji.name,
                                            id: Component.emoji.id,
                                            animated: Component.emoji.animated,
                                        })
                                    )
                                    embedTicket.setDescription(embedTicket.data.description + `\n> <:${Component.emoji.name}:${Component.emoji.id}> **${Component.label}**`)
                                } else {
                                    row.addComponents(
                                        new ButtonBuilder()
                                        .setCustomId(`${Component.label}_${cmd.name}_${i}`)
                                        .setLabel(`${Component.label}`)
                                        .setStyle(ButtonStyle[`${String(Component.style)}`] || '1')
                                    )
                                    embedTicket.setDescription(embedTicket.data.description + `\n> **${Component.label}**`)
                                }
                            } else {
                                let SelectMenu = new SelectMenuBuilder();
                                SelectMenu.setPlaceholder(Component.placeHolder)
                                SelectMenu.setCustomId(`${Component.setName}_${cmd.name}_${i}`)
                                var options = Component.options
                                options = options.map(o => {
                                    i++;
                                    return new Object({label: o.label, description: o.description, value: `${o.label}_${cmd.name}_${i}`});
                                })
                                SelectMenu.addOptions(options.map(x => x))
                                row.addComponents(
                                    SelectMenu
                                )
                                embedTicket.setDescription(embedTicket.data.description + `\n> **${Component.label}**`)
                            }
                            
                            i++;
                        }
                        cmt.push(row)
                    }
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                            .setColor('Blurple')
                            .setDescription('Votre message pour les ticket a été envoyé dans ce channel avec succès !')
                        ],
                        ephemeral: true
                    })
                    interaction.channel.send({
                        embeds: [
                            embedTicket
                            .setTitle('Créateur de ticket')
                            .setColor('Orange')
                            .setThumbnail()
                            .setFooter({text: "Ticket - Creator"})
                        ],
                        components: cmt
                    })
                }
            }

            this.commands.set(cmd.name, all)

            console.log('[+]'.green + ` Ajout de la commande Ticket : ${cmd.name}`.cyan)

        }
        await this.application?.commands.set(ArrayCmd)
    }
}

export class Ticket{
    constructor(TicketName) {
        if(!TicketName)throw new Error("\x1b[31m \nTicketName is not defined! \x1b[33m \n\nexample: \nnew Ticket('Random Name')\n \x1b[0m")
        this.TicketName = TicketName.toLowerCase().replace(" ", "-")
    }
    rows = [new Array(),new Array(),new Array(),new Array(),new Array()]

    addButton({
        setName,
        style,
        emojiName,
        emojiId,
        emojiAnimated,
    }) {
        try{
            if(!setName)throw new Error("\x1b[31m \nname is not defined! \x1b[33m \n\nexample: \n.addButton({\n    setName: 'Exemple of name'\n})\n \x1b[0m")
            if(!style)throw new Error("\x1b[31m \nstyle is not defined! \x1b[33m \n\nexample: \n.addButton({\n    style: ButtonStyle.Primary\n})\n \x1b[0m")
            if(this.rows[4].length == 5) throw new Error("\x1b[31m \nYou have reached the button and select menu limit! \x1b[33m \n\nLimits: 25 Buttons or 5 SelectMenus\n \x1b[0m")
            if(this.rows[4][0]){
                if(this.rows[4][0].type == 'Select_Menu') throw new Error("\x1b[31m \nYou have reached the button and select menu limit! \x1b[33m \n\nLimits: 25 Buttons or 5 SelectMenus\n \x1b[0m")
            }

            for (let row of this.rows){
                if(row.length > 4)continue;
                if(row[0]){
                    if(row[0].type == "Select_Menu")continue;
                }
                row.push({
                    label: setName,
                    style: style,
                    emoji: {
                        name: emojiName || null,
                        id: emojiId || null,
                        animated: emojiAnimated || false,
                    },
                    type: "Button",
                })
                break;
            }
            if(!fs.existsSync('dataStorage')) fs.mkdirSync('dataStorage');
            fs.writeFileSync('dataStorage/' + this.TicketName + '.json', JSON.stringify(this.rows))
            return this;
        } catch (e) {
            console.log(e)
            process.exit(0)
        }
    }
    addSelect_Menu({
        setName,
        placeHolder,
        options = [
            {
                label,
                description,
            }
        ]
    }) {
        try {
            if(!setName)throw new Error("\x1b[31m \nname is not defined! \x1b[33m \n\nexample: \n.addSelect_Menu({\n    setName: 'Exemple of name'\n})\n \x1b[0m");
            if(!options)throw new Error("\x1b[31m \noptions is not defined! \x1b[33m \n\nexample: \n.addSelect_Menu({\n    option: [ {label: 'option 1', description: 'this is a description'} ]\n})\n \x1b[0m");
            if(this.rows[4].length > 0)throw new Error("\x1b[31m \nYou have reached the button and select menu limit! \x1b[33m \n\nLimits: 25 Buttons or 5 SelectMenus\n \x1b[0m");
            
            for (let row of this.rows){
                if(row.length > 4)continue;
                if(row[0])continue;
                row.push({
                    label: setName,
                    placeHolder: placeHolder || null,
                    options: options,
                    type: "Select_Menu",
                })
                break;
            }
            if(!fs.existsSync('dataStorage')) fs.mkdirSync('dataStorage');
            fs.writeFileSync('dataStorage/' + this.TicketName + '.json', JSON.stringify(this.rows))
            return this;

        } catch (e) {
            console.log(e)
            process.exit(0)
        }
    }
}

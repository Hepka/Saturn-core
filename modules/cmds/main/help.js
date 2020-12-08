const Discord = require(`discord.js`);

const capitalize = require(`../../../lib/capitalize.js`)
const config = require(`../../../config.json`)

module.exports.run = (message = new Discord.Message(), client = new Discord.Client(), args = ['']) => {
    let categories = new Set(client.commands.map(command => command.config.category))
    let key = args[0] ?? 'main';
    let help = new Discord.MessageEmbed()
        .setFooter(`${client.user.username} ${config.version} - help`, client.user.avatarURL())
        .setThumbnail(message.author.avatarURL())
        .setTitle(`Помощь по запросу: ${capitalize(key)}`)

    if (!categories.has(key) && client.commands.has(key)) {
        let command = client.commands.get(key);
        help.addField(`Описание:`, capitalize(command.config.description))
        help.addField(`Использование:`, config.prefix + command.config.using)
        help.addField(`Примеры:`, command.config.examples.map(example => config.prefix + example).join(`, `))
        help.addField(`Алиасы:`, command.config.aliases.join(", ") ?? "нет.")
        help.addField(`Права:`, command.config.permissions.length == 0 ? "доступна всем." : command.config.permissions.join(", "))
    } 

    if (categories.has(key)) {
        client.commands.filter(command => command.config.category == key).forEach(command => {
            help.addField(capitalize(command.config.name), `Описание: ${command.config.description}\nИспользование: ${command.config.using}`)
        })
    }

    message.channel.send(help)
}

module.exports.config = {
    aliases: [`h`,`помощь`],
    permissions: [],
    args: [],

    description: `Покажет данное сообщение.`,
    bigDescription: `Посмотреть команды главной или любой другой категории, или получить помощь по команде.`,
    using: `help [имя команды || имя категории]`,
    examples: [`help main`, `help help`]
}
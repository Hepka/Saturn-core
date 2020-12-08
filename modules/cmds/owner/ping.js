const Discord = require(`discord.js`);

module.exports.run = (message = new Discord.Message(), client = new Discord.Client(), args = ['']) => {
    message.reply(`pong!`)
    message.react(`🏓`)
}

module.exports.config = {
    aliases: [`p`,`пинг`],
    permissions: [],
    args: [],

    description: `проверка работоспособности бота`,
    bigDescription: `бот ответит "pong!", если он работает. Команда для разработчика`,
    using: `ping`,
    examples: []
}
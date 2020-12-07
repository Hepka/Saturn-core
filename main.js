const Discord = require(`discord.js`);
const FileSystem = require(`fs`);

const config = require(`./config.json`)
const dictionary = require(`./json/dictionary.json`)

const Client = new Discord.Client();

Client.commands = new Discord.Collection();

FileSystem.readdir(`modules/cmds/`, async (error, categories) => {
    if (error) console.log(error);

    categories.forEach(async category => {
        FileSystem.readdir(`modules/cmds/${category}/`, async (error, commands) => {
            if (error) console.log(error);

            commands.forEach(async command => {
                command = command.split(".")[0];
                let props = require(`./modules/cmds/${category}/${command}.js`);
                
                props.config.name ??= command;
                props.config.visible ??= !(category == `owner`);
                props.config.category ??= category;
                
                Client.commands.set(props.config.name, props);
            })
        })
    })
})

Client.on(`ready`, async () => {
    console.log(`${Client.user.tag} ready!`)

    FileSystem.readdir(`modules/intervals/`, async (error, intervals) => {
        if (error) return console.log(error)

        intervals.filter(interval => interval.endsWith(`.js`)).forEach(async interval => {
            let props = require(`./modules/intervals/${interval}`)

            setInterval(() => props.run(Client), props.timeOut);
        })
    })
})

let cooldowns = {};

Client.on(`message`, async message => {
    if ((message.channel.type == 'dm') || message.author.bot) return;
    
    let prefix = config.prefix;
    let language = `ru`

    if (!message.content.toLowerCase().startsWith(prefix)) return;

    let arguments = message.content.split(/ +/g).map(argument => argument.toLowerCase());
    let commandname = arguments[0].slice(prefix.length).replace(/[\.\-]/g, '');

    arguments = arguments.slice(1);

    let command = Client.commands.find(command_ => command_.config.name == commandname || command_.config.aliases.includes(commandname));

    cooldowns[message.guild.id] ??= 0
    if (cooldowns[message.guild.id] + 3e3 > Date.now()) return message.reply(dictionary[language]["abuse cooldown"])

    if (!command) return message.reply(dictionary[language]["command not find"])
    if (!command.config.visible && !config.owners.includes(message.author.id)) return message.reply(dictionary[language]["owner command"])
    if (command.config.args.length > arguments.length) return message.reply(dictionary[language]["few arguments"] + command.config.args[arguments.length])
    if (!!command.config.permissions.length && !command.config.permissions.some(permission => message.member.permissions.has(permission))) return message.reply(dictionary[language]["missing permissions"])

    cooldowns[message.guild.id] = Date.now()

    command.run(message, Client, arguments);
})

Client.login(config.token)
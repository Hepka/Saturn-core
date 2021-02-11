const Discord = require("discord.js");
const FS = require("fs");

const config = require("../config.json");
const Command = require("./modules/Command.js")

const Client = new Discord.Client({ disableMentions: "everyone" });
Client.login(config.token)
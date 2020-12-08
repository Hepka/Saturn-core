const Discord = require(`discord.js`);

module.exports.run = (message = new Discord.Message(), client = new Discord.Client(), args = ['']) => {
    let alphabet = "abcdefghijklmnopqrstuvwxyz0123456789 +=/-_!@#$%^&*():;,?"
    let SB = {}, BS = {}
    let bits = alphabet.length.toString(2).length
    alphabet.split("").forEach((a, i)=>{
        let b = "0".repeat(bits - i.toString(2).length) +  i.toString(2)
        SB[a] = b
        BS[b] = a
    })

    let toB = str => str.split("").map(a => SB[a] ?? '0'.repeat(bits)).join("")
    let toS = str => str.match(new RegExp(`/.{${bits}}/`, `g`)).map(a => BS[a] ?? "�").join("")
    
    let xor = (str, key) => {
        str = toB(str)
        key = toB(key)
        key = key.repeat((str.length - (str.length % key.length)) / key.length)
        return toS(str.split("").map((a, i)=> a ^ key[i]).join(''))
    }

    message.reply(xor(args.slice(1).join(" "), args[0]))
}

module.exports.config = {
    aliases: [`cp`,`шифр`],
    permissions: [],
    args: ["введи ключ для шифровки! пример: `boat`", "введи строку для шифрования!"],

    description: `Зашифровать строку`,
    bigDescription: `Зашифровка строки с использованием xor оператора. Внимание, русские символы не используются`,
    using: `cipher <ключ> <строка>`,
    examples: [`cipher boat creator`]
}
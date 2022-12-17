const fs = require('fs');

const glob = require('glob');
var module_dict = {};
glob.sync('./modules/**/*.js').forEach(function (file) {
    let dash = file.split('/');
    if (dash.length == 4) {
        let dot = dash[3].split('.');
        if (dot.length == 2 && dash[2] == dot[0]) {
            let key = dot[0];
            module_dict[key] = require(file);
        }
    }
});

const { Client, Intents } = require('discord.js');

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS);
myIntents.add(Intents.FLAGS.GUILD_MESSAGES);
myIntents.add(Intents.FLAGS.GUILD_MEMBERS);
myIntents.add(Intents.FLAGS.DIRECT_MESSAGES);

const client = new Client({ intents: myIntents });
const config = require('./config.json');

const attr = {
    execmode: false,
    execmsg: false,
    execuser: false
};

client.once('ready', () => {

    client.user.setPresence({
        status: 'active',
        activities: [config["activity"]]
    });

    console.log('active');

});


client.on('messageCreate', async message => {

    fs.readFile(__dirname + '/data/autoresponder.json', (err, data) => {
        if (err) throw err;
        let auto = JSON.parse(data.toString().trim());
        if (!auto.hasOwnProperty(message.guild.id))
            auto[message.guild.id] = {};
        if (auto[message.guild.id].hasOwnProperty(message.content.toLowerCase())) {
            message.channel.send(auto[message.guild.id][message.content.toLowerCase()]);
            return;
        }
    });

    var prefix;

    if (message.content == '') return;

    if (message.guild) {
        let p = JSON.parse(
            fs
                .readFileSync(__dirname + '/data/prefixes.json')
                .toString()
                .trim()
        );

        if (p['prefix'].hasOwnProperty(message.guild.id)) {
            prefix = p['prefix'][message.guild.id];
        } else prefix = 'lel.';
    } else prefix = 'lel.';

    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    const command = args[0];
    const param = args[1];
    const context = message.content.slice((prefix + command).length).trim();


    if ( message.content.startsWith(prefix) && command in module_dict ) module_dict[command](message, context);


});


client.login(config.token).catch(console.log);

//const { promisify } = require('util');
const fs = require('fs');
//const readFileAsync = promisify(fs.readFile);

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

const { Client, Intents, MessageEmbed, Message } = require('discord.js');

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
        activities: [{ type: 'WATCHING', name: 'Mt Lady\'s giant coochie' }]
    });

    let presenceTypes = ['Playing ', 'Streaming ', 'Listening ', 'Watching '];

    console.log('active');

});


client.on('messageCreate', async message => {

    var prefix;

    //console.log(message.content);

    if (message.content == '') return;

    if (message.guild) {
        let p = JSON.parse(
            fs
                .readFileSync(__dirname + '/data/prefixes.json')
                .toString()
                .trim()
        );

        //console.info(JSON.stringify(p));
        if (p['prefix'].hasOwnProperty(message.guild.id)) {
            //console.info(pr['prefix'][message.guild.id]);

            prefix = p['prefix'][message.guild.id];
        } else prefix = 'lel.';

        /*if(config.prefix.hasOwnProperty(message.guild.id))
                    prefix = config.prefix[message.guild.id];
                else prefix = 'lel.';*/
    } else prefix = 'lel.';

    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    const command = args[0];
    const param = args[1];
    const context = message.content.slice((prefix + command).length).trim();


    if (command in module_dict) module_dict[command](message, context);


});


client.login(config.token).catch(console.log);
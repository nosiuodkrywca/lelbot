const fs = require('node:fs');
const path = require('node:path');
const glob = require('glob');
const argv = require('minimist')(process.argv.slice(2));


const { Client, Collection, Events, GatewayIntentBits, Partials, ActivityType } = require('discord.js');

const { token } = require('./config.json');




// check if LELBOT_DATA_DIR env variable exists, if not, create data dir in user home directory
const data_dir = (typeof process.env.LELBOT_DATA_DIR != "undefined" ? process.env.ENV_VARIABLE : process.env.HOME+'/lelbot_data' );
module.exports = {
    data_dir: data_dir
};

// create data dir if not exists

if (!fs.existsSync(data_dir))
    fs.mkdirSync(data_dir);

if (!fs.existsSync(data_dir+"/prefixes.json"))
    fs.writeFileSync(data_dir + '/prefixes.json', "{}", { flag: "wx" });

if (!fs.existsSync(data_dir+"/autoresponder.json"))
    fs.writeFileSync(data_dir + '/autoresponder.json', "{}", { flag: "wx" });

if (!fs.existsSync(data_dir+"/temp"))
    fs.mkdirSync(data_dir+"/temp");

// end

var module_dict = {};
glob.sync('./modules/**/*.js').forEach(function (file) {
    let dash = file.split('/');
    if (dash.length == 4) {
        let dot = dash[3].split('.');
        if (dot.length == 2 && dash[2] == dot[0]) {
            console.log(`imported ${dot[0]} from ${dash[2]}`);
            let key = dot[0];
            module_dict[key] = require(file);
        }
    }
});



//const myIntents = new Intents();
//myIntents.add(Intents.FLAGS.GUILDS);
//myIntents.add(Intents.FLAGS.GUILD_MESSAGES);
//myIntents.add(Intents.FLAGS.GUILD_MEMBERS);
//myIntents.add(Intents.FLAGS.DIRECT_MESSAGES);

const intents = [];
intents.push(GatewayIntentBits.Guilds);
intents.push(GatewayIntentBits.GuildMessages);
intents.push(GatewayIntentBits.GuildMessageReactions);
intents.push(GatewayIntentBits.GuildMembers);
intents.push(GatewayIntentBits.DirectMessages);

const partials = [];
partials.push(Partials.Channel);

const client = new Client({ intents, partials });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}


/*
 *               _   _       _ _         
 *     /\       | | (_)     (_) |        
 *    /  \   ___| |_ ___   ___| |_ _   _ 
 *   / /\ \ / __| __| \ \ / / | __| | | |
 *  / ____ \ (__| |_| |\ V /| | |_| |_| |
 * /_/    \_\___|\__|_| \_/ |_|\__|\__, |
 *                                  __/ |
 *                                 |___/ 
 */

client.once('ready', () => {

    /*let type = (()=>{
        switch(argv['activity-type'].toLowerCase()) {
            case 'playing':
                return ActivityType.Playing;
                // returns 0
            case 'streaming':
                return ActivityType.Streaming;
                // returns 1
            case 'listening':
                return ActivityType.Listening;
                // returns 2
            case 'watching':
                return ActivityType.Watching;
                // returns 3
            case 'custom':
                return ActivityType.Custom;
                // returns 4
            case 'competing':
                return ActivityType.Competing;
                // returns 5
            default:
                return ActivityType.Playing;
                // returns 0
        }
    })();*/

    let type = (()=>{
        const key = argv['activity-type'][0].toUpperCase() + argv['activity-type'].toLowerCase().substr(1);
        return ActivityType[key] ?? ActivityType.Playing;
    })();

    let status = ['online', 'idle', 'invisible', 'dnd'].includes(argv['status']) ? argv['status'] : 'online' || 'online';

    let name = argv['activity-name'] || 'lel.help';

    client.user.setPresence({
        status,
        activities: [{type, name}]
    });

    console.log(`active with status: ${status}`);

});


/*
 *  _____       _                      _   _                 
 * |_   _|     | |                    | | (_)                
 *   | |  _ __ | |_ ___ _ __ __ _  ___| |_ _  ___  _ __  ___ 
 *   | | | '_ \| __/ _ \ '__/ _` |/ __| __| |/ _ \| '_ \/ __|
 *  _| |_| | | | ||  __/ | | (_| | (__| |_| | (_) | | | \__ \
 * |_____|_| |_|\__\___|_|  \__,_|\___|\__|_|\___/|_| |_|___/
 * 
 */                                                          
                                                          
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});



/*
 *  __  __                                     
 * |  \/  |                                    
 * | \  / | ___  ___ ___  __ _  __ _  ___  ___ 
 * | |\/| |/ _ \/ __/ __|/ _` |/ _` |/ _ \/ __|
 * | |  | |  __/\__ \__ \ (_| | (_| |  __/\__ \
 * |_|  |_|\___||___/___/\__,_|\__, |\___||___/
 *                              __/ |          
 *                             |___/
 */

client.on('messageCreate', async message => {

    fs.readFile(data_dir + '/autoresponder.json', (err, data) => {
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
        let prefixes = JSON.parse(
            fs
                .readFileSync(data_dir + '/prefixes.json')
                .toString()
                .trim()
        );

        if (prefixes.hasOwnProperty(message.guild.id)) {
            prefix = prefixes[message.guild.id];
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

/*
 *  _                 _       
 * | |               (_)      
 * | |     ___   __ _ _ _ __  
 * | |    / _ \ / _` | | '_ \ 
 * | |___| (_) | (_| | | | | |
 * |______\___/ \__, |_|_| |_|
 *               __/ |        
 *              |___/         
 */

client.login(token).catch(console.log);



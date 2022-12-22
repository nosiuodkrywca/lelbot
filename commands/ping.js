const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('check if this sh¡t works'),
	async execute(interaction) {

        items = [
            'yeah don\'t even bother',
            'f off m8',
            'ded',
            'can\'t you just check the status icon?!',
            'doing better than you'
        ];

		await interaction.reply(items[Math.floor(Math.random()*items.length)]);
	},
};
const request = require('request')
const fs = require('node:fs')
const { data_dir } = require('../index');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pasek')
		.setDescription('Generuje pasek TVPiS')
        .addStringOption(option=>
            option.setName('input')
                .setDescription('Tekst na pasku')
                .setRequired(true)),
	async execute(interaction) {

        let _rand = Math.round(Math.random());

        request(
            {
                url: 'https://pasek-tvpis.pl',
                method: 'POST',
                followAllRedirects: true,
                jar: true,
                encoding: 'binary',
                form: {
                    fimg: _rand,
                    msg: interaction.options.getString('input').toUpperCase()
                }
            },
            async (error, response, body) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(response.headers);
                    fs.writeFile(data_dir+'/temp/pasek.jpg', body, 'binary', async () => {
                        await interaction.reply({ files: [data_dir+'/temp/pasek.jpg'] });
                    });
                }
            }
        );
	},
};
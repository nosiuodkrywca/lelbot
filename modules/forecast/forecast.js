const { MessageEmbed } = require('discord.js');
const request = require('request');

function forecast(message, context) {

    var translate_re = /[ąółżźśćę]/g;
    var translate = {
        "ą": "a",
        "ó": "o",
        "ł": "l",
        "ż": "z",
        "ź": "z",
        "ś": "s",
        "ć": "c",
        "ę": "e"
    };

    let s = context.toLowerCase().replace(translate_re, function (match) {
        return translate[match];
    });

    let symbols = {
        "Rain": "🌧️",
        "Clouds": "☁️",
        "Drizzle": "🌧️",
        "Snow": "🌨️",
        "Thunderstorm": "⛈️",
        "Clear": "☀️",
        "Fog": "🌫️",
        "Mist": "🌫️",
        "Haze": "🌫️"
    };

    request.get("http://api.openweathermap.org/data/2.5/forecast?q=" + s + "&appid=f62fd48b2f4268071a2295e18a4a4b02&lang=pl&units=metric", function (
        err,
        res,
        body
    ) {
        let forecast = JSON.parse(body.toString().trim());

        let embed = new MessageEmbed()
            .setTitle("Prognoza pogody dla miasta " + forecast["city"]["name"]);

        for (let k = 0; k < 5; k++) {

            embed.addFields([forecast["list"][k]["dt_txt"].substr(11, 5), symbols[forecast["list"][k]["weather"][0]["main"]] + " " + Math.floor(forecast["list"][k]["main"]["temp"]) + "°C - " + forecast["list"][k]["weather"][0]["description"]], false);
        }
        embed.addField("Szczegółowa prognoza", "[OpenWeatherMap](https://openweathermap.org/city/" + forecast["city"]["id"] + ")", false);
        message.channel.send({ embeds: [embed] });
    });
}

module.exports = forecast;
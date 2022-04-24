const request = require('request')
const fs = require('fs')

pasek = function (message, context) {
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
                msg: context.toUpperCase()
            }
        },
        function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                console.log(response.headers);
                fs.writeFile('./modules/pasek/pasek.jpg', body, 'binary', function () {
                    message.channel.send({ files: ['./.temp/pasek.jpg'] });
                });
            }
        }
    );
}

module.exports = pasek
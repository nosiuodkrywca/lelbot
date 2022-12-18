//const webshot = require('node-webshot');
const puppeteer = require('puppeteer');
//const { Pageres } = import('pageres');
//const fs = require('fs');
const { data_dir } = require('../..');

const lang = require('../../builtin/lang');

fake = async function (message, context) {
    //let options = { captureSelector: "#msg" };

    const param = context
        .trim()
        .split(/ +/g)[0];

    let avatar, content, color, user, name;

    if (message.mentions.members.first() || message.mentions.users.first()) {

        avatar = await message.mentions.users.first().avatarURL();

        content = context
            .slice(param.length + 1)
            .replace(/<a?:(?!GW)[\w\d_]+:\d+>/g, "")
            .replace(/\+[\w]*/, "")
            .trim();

        color =
            message.mentions.members.first().displayHexColor.substr(1) ||
            "000000";
        if (color == "000000") color = "FFFFFF";

        user =
            message.mentions.members.first() || message.mentions.users.first();
        name = user.displayName || user.username;


    } else {
    /*
        avatar = await message.author.avatarURL();
        content = context
            .slice(0)
            .replace(/<a?:(?!GW)[\w\d_]+:\d+>/g, "")
            .trim();

        color = message.author.displayHexColor.substr(1);
        if (color == "000000") color = "FFFFFF";

        user =
            message.author;
        name = user.displayName || user.username;
        */
       return;
    }

    let req =
        "https://playground.nosiu.pl/fakemessage/index.php?user=" + encodeURI(name) +
        "&avatar=" + avatar +
        "&color=" + color +
        "&content=" + encodeURI(content) +
        "&id=" + message.mentions.users.first().id;
    if (context.match(/\+metal/)) req += "&metal";

    try {
       // webshot(req, data_dir+"/temp/fake.png", options, function (err) {
        //    if (!err) {
         //       message.channel.send({ files: [data_dir+"/temp/fake.png"] });
          //      if (message.guild) message.delete();
           // }
        //});

        throw("Module is broken because of unmet dependencies and deprecations.");
        
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        console.log("puppeteer launched");

        const page = await browser.newPage();
        console.log("browser opened new page");

        await page.goto(req, {waitUntil : "domcontentloaded"});
        //await page.waitForSelector('.avatar-large');
        //await page.goto(req);
        
        console.log("page navigated to:");
        console.log("\n"+req+"\n");

        await page.screenshot({path: data_dir+'/temp/fake.png'});
        console.log("took screenshot");

        message.channel.send({ files: [data_dir+"/temp/fake.png"] });
        if (message.guild) message.delete();

        await browser.close();
        console.log("browser closed")



        //let captureWebsite = await import('capture-website');

        /*await captureWebsite.file(req, data_dir+"/temp/fake.png", {overwrite: true}, (error)=>{
            if(!error) {
                message.channel.send({ files: [data_dir+"/temp/fake.png"] });
                if (message.guild) message.delete();
            }
        });*/

        //await Pageres({delay: 0, filename: 'fake.png'}).source(req).destination(data_dir+'/temp');

        //message.channel.send({ files: [data_dir+"/temp/fake.png"] });
        //if (message.guild) message.delete();
        

    } catch (e) {
        console.error(e);
        console.log("continuing...")

        
        message.reply(lang.error(e)).then((reply)=>{
            setTimeout(() => {
                reply.delete();
                if(message.guild) message.delete();
            }, e.length*150);
        });
    }
}


module.exports = fake
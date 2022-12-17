datadir_check = function (data_dir) {

    var required_json_files = ['prefixes.json', 'autoresponder.json'];

    if (!fs.existsSync(data_dir)){
        fs.mkdirSync(data_dir);

        required_json_files.forEach(file => {
            if(!fs.existsSync(data_dir + file))
                fs.writeFileSync(data_dir + file, "{}", { flag: "wx" });
        });

    }

    return 0;

}

module.exports = { datadir_check };
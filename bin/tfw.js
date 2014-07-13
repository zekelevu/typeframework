#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var util = require('util');
var exec = require('child_process').exec;
var program = require('commander');
var package = require('../package.json');
var NOOP = function() {};

program.version(package.version, '-v, --version');

// $ tfw new <App Name>
cmd = program.command('new [app_name]');
cmd.usage('[app_name]');
cmd.unknownOption = NOOP;
cmd.action(function() {
    var name = program.args[0];
    if (!name) return program.help();

    var appPath = path.resolve(process.cwd(), name);
    if (fs.existsSync(appPath))
        return console.log('Error: A file or directory already exists at: ./' + name);

    fs.mkdirSync(appPath);
    process.chdir(appPath);

    var gruntInitPath = path.resolve(__dirname, '../node_modules/grunt-init/bin/grunt-init');
    var templatePath = path.resolve(__dirname, '../node_modules/typeframework-generate-app');
    var cmd = gruntInitPath + ' ' + templatePath;
    exec(cmd, function(error, stdout, stderr) {
        util.puts(stdout);
        console.log('Installing dependencies...');
        exec('npm install', function(error, stdout, stderr) {
            if (error) return util.puts(error);
            exec('npm link typeframework', function(error, stdout, stderr) {
                if (error) return util.puts(error);
                console.log('New app created!');
            });
        });
    });
});

// $ tfw start
cmd = program.command('start');
cmd.unknownOption = NOOP;
cmd.action(function() {
    var spawn = require('child_process').spawn,
        app   = spawn('npm', ['start']);

    app.stdout.on('data', function (data) {
        util.print(data);
    });

    app.stderr.on('data', function (data) {
        util.print(data);
    });

    app.on('close', function (code) {
        util.print('child process exited with code ' + code);
        process.exit();
    });
});

program.parse(process.argv);
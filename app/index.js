'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var npm = require('npm');
var bower = require('bower');

var KoastGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('Let\'s Koast!'));

    var prompts = [
      {
        name: 'packageName',
        message: 'Please pick a package name:',
        default: 'my-app'
      }
    ];

    this.prompt(prompts, function (props) {
      this.packageName = props.packageName;
      done();
    }.bind(this));
  },

  app: function () {

    var directories = [
      'client',
      'client/app',
      'client/app/css',
      'client/app/img',
      'client/app/core',
      'client/app/components',
      'client/app/sections',
      'client/testing',
      'client/bower_components',
      'server',
      'server/lib',
      'config',
      'config/local',
    ];

    var files = [
      ['package.json', ''],
      ['bower.json', ''],
      ['Gulpfile.js', ''],
      ['.bowerrc', ''],
      ['.gitignore', ''],
      ['.jsbeautifyrc', ''],
      ['.jshintrc', ''],
      ['app.json', 'config/local/'],
      ['databases.json', 'config/local/'],
      ['index.html', 'client/app/'],
      ['karma.conf.js', 'client/app/testing/'],
      ['mocha.conf.js', 'client/app/testing/']
    ];

    var that = this;

    directories.forEach(function(path) {
      that.mkdir(path);
    });

    files.forEach(function(paths) {
      that.template(paths[0], paths[1] + paths[0]);
    });

    var npmPackages = [
      'lodash',
      'koast'
    ];

    var npmDevPackages = [
      'gulp',
      'rangle-gulp'
    ];

    npm.load({
      loaded: false
    }, function (err) {
      if (err) {
        console.error(err);
        return;
      }
      npm.config.set('save', true);
      npm.commands.install(npmPackages, function (err, data) {
        if (err) {
          console.error(err);
          return;
        }
        npm.config.set('save', false);
        npm.config.set('save-dev', true);
        npm.commands.install(npmDevPackages, function (err, data) {
          if (err) {
            console.error(err);
            return;
          }
        })
      });
      npm.on('log', function (message) {
        // log the progress of the installation
        console.log(message);
      });
    });

    var bowerComponents = [
      // 'angular',
      // 'angular-mocks',
      // 'lodash',
      'koast'
    ];

    bower.commands.install(bowerComponents, { save: true }, { /* custom config */ })
    .on('end', function (installed) {
      console.log('Done with bower.');
    });

  },

  projectfiles: function () {
    // this.copy('editorconfig', '.editorconfig');
    // this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = KoastGenerator;
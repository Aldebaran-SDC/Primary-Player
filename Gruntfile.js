module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-aws-s3');

  grunt.initConfig({

    aws: grunt.file.readJSON('aws-keys.json'),

    aws_s3: {
      options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>',
        secretAccessKey: '<%= aws.AWSSecretKey %>',
      },
      dist: {
        options: {
          bucket: 'sdc-primary-player',
        },
        files: [
          {
            expand: true,
            cwd: 'client/dist/',
            src: ['**'],
            dest: '/',
          },
        ],
      },
    },

  });

  grunt.registerTask('s3deploy', 'aws_s3:dist');
};

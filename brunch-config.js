module.exports.config = {
  files: {
    javascripts: {
      joinTo: {
        "js/app.js": /^app/,
        "js/vendor.js": /^(?!app)/
      },
      order: {
        before: [
          "bower_components/jquery/dist/jquery.js",
          "bower_components/underscore/underscore.js",
          "bower_components/bluebird/js/browser/bluebird.js",
          "bower_components/react/react.js"
        ]
      }
    },

    stylesheets: {
      joinTo: "css/app.css"
    },

    templates: {
      joinTo: "js/app.js"
    }
  },
  plugins: {
    react: {
      autoIncludeCommentBlock: true,
      harmony: true,
      transformOptions : {
        sourceMap : true
      }
    },
    reactTags: {
      verbose: true
    }
  },
  server: {
    path: 'app.js',
    port: 3333,
    run: true
  }
};

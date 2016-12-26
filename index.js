'use strict';

const webpack = require('webpack');

const handleResults = (err, stats) => {
  if (err) {
    throw err;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.errors.length > 0) {
    throw new Error(JSON.stringify(jsonStats.errors));
  }
  if (jsonStats.warnings.length > 0) {
    throw new Error(JSON.stringify(jsonStats.warnings));
  }
};

// returns a Compiler instance
const compilerEs5 = webpack({
  entry: {
    app: './lib/builder/es6-from-es6.js'
  },
  output: {
    filename: 'dist/bundle-es5.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'babili']
        }
      }
    ]
  }
});

compilerEs5.run(handleResults);

// returns a Compiler instance
const compilerEs6 = webpack({
  entry: {
    app: './lib/builder/es6-from-es6.js'
  },
  output: {
    filename: 'dist/bundle-es6.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['babili']
        }
      }
    ]
  }
});

compilerEs6.run(handleResults);
// or
/* compiler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
    // pass a number to set the polling interval
}, function(err, stats) {
    // ...
}); */

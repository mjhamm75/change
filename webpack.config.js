module.exports = {
    devtool: 'inline-source-map',
    entry: './app.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
              test: /\.js$/,
              loader: 'babel',
              query: {
                presets: ['es2015', 'react']
              }
            }
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    }
};

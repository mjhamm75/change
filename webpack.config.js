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
                presets: ['es2015', 'react'],
                plugins: ["transform-object-rest-spread"],
              }
            },
            {
              test: /\.css$/,
              loader: "style-loader!css-loader"
            },
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    }
};

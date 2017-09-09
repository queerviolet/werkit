const path = require('path')
    , my = require('./my')
    , rxquire = require('rxquire')
    , {config} = require('rxquire/webpack')
    , {plugin, rule, resolveExt, resolveAll, target} = config
    
module.exports = output => rxquire()
  .config(config(output))
  .config(resolveExt('.kubo'))
  .config(resolveExt('.mmm'))
  .config(rule({
    test: /\.jsx?$/,
    use: babel,
    exclude: /node_modules/,
  }))
  .config(rule({
    test: /\.(kubo|mmm)$/,
    use: [babel, 'many-matters/loader'],
    exclude: /node_modules/,
  }))
  .config(rule({
    test: /\.(jpeg|jpg|png|)$/,
    use: 'url-loader',
    exclude: /node_modules/,
  }))
  .config(rule({
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  }))
  .config(rule({
    test: /\.(txt|md|markdown)$/,
    use: 'raw-loader',
    exclude: /node_modules/,    
  }))
  .config(rule({
    test: /\.(glsl|frag|vert)$/,
    use: 'glslify-loader',
  }))
  // Add our node modules to the search path  
  .config(resolveAll(path.join(__dirname, 'node_modules')))

const babel = {
  loader: 'babel-loader',
  options: {
    "presets": [
      [my('babel-preset-es2015'), {modules: false}],
      my('babel-preset-stage-2'),
      my('babel-preset-react')
    ],
    "plugins": [
      my('react-hot-loader/babel')
    ]
  },
}

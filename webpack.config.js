const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  //Entry el punto de entrada de mi aplicación
  entry: './src/index.js',
  output: { // Esta es la salida de mi bundle
    path: path.resolve(__dirname, 'dist'),
    // resolve lo que hace es darnos la ruta absoluta de el S.O hasta nuestro archivo
    // para no tener conflictos entre Linux, Windows, etc
    filename: 'main.js', // EL NOMBRE DEL ARCHIVO FINAL,
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        // Test declara que extensión de archivos aplicara el loader
        test: /\.m?js$/,// LEE LOS ARCHIVOS CON EXTENSION .JS,
        // Exclude permite omitir archivos o carpetas especificas
        exclude: /node_modules/, // IGNORA LOS MODULOS DE LA CARPETA
        // Use es un arreglo u objeto donde dices que loader aplicaras
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css|styl$/i,
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ],
      },
      { // Webpack por defecto nos trae esta funcionalidad
        // Podemos pasar imagenes al proyecto en el disk
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000, // O LE PASAMOS UN BOOLEANOS TRUE O FALSE
              // Habilita o deshabilita la transformación de archivos en base64.
              mimetype: "application/font-woff",
              // Especifica el tipo MIME con el que se alineará el archivo. 
              // Los MIME Types (Multipurpose Internet Mail Extensions)
              // son la manera standard de mandar contenido a través de la red.
              name: "[name].[ext]",
              // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN
              // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria 
              // ubuntu-regularhola.woff
              outputPath: "./assets/fonts/",
              // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
              publicPath: "./assets/fonts/",
              // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
              esModule: false,
              // AVISAR EXPLICITAMENTE SI ES UN MODULO
            },
          },
        ],
      },
    ],
  },
  // SECCION DE PLUGINS
  plugins: [
    new HtmlWebpackPlugin({ // CONFIGURACIÓN DEL PLUGIN
      inject: true, // INYECTA EL BUNDLE AL TEMPLATE HTML
      template: './public/index.html', // LA RUTA AL TEMPLATE HTML
      filename: './index.html' // NOMBRE FINAL DEL ARCHIVO
    }),
    new MiniCssExtractPlugin(), // INSTANCIAMOS EL PLUGIN
    new CopyPlugin({ // CONFIGURACIÓN DEL COPY PLUGIN
      patterns: [
        {
          // CARPETA A MOVER AL DIST
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images"// RUTA FINAL DEL DIST
        }
      ]
    })
  ]
}
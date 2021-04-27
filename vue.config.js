module.exports = {
    configureWebpack:{
        resolve:{
            alias:{
                'assets':'@/assets',
                'components':'@/components',
                'views':'@/views',
                'services':'@/services',
                'utils':'@/utils'
            }
        }
    },
    publicPath:'./'
}
module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                '/api': {
                    target: 'https://elm.cangdu.org',
                    pathRewrite: {'/api': ''},
                    ws: true,
                    changeOrigin: true,
                },
            }
        }
    }
}
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/pwa03' : '/',
    pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: './src/service-worker.js',
        }
    }
};

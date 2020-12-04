module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/docs' : '/',
    pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: './src/service-worker.js',
        }
    }
};

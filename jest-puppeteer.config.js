// jest-puppeteer.config.js
module.exports = {
    launch: {
        dumpio: true,
        headless: process.env.HEADLESS !== 'false',
    },
    server: {
        command: 'node node_modules/.bin/webpack-dev-server',
        port: 3000,
        launchTimeout: 10000,
        debug: false,
    },
}
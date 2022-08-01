module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: ['last 2 version', '> 1%', 'not dead'],
        }),
    ],
}

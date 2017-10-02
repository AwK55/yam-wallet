'use strict'

module.exports = {
	async root(ctx) {
		ctx.body =`<!doctype html>
        <html>
            <head>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body>
                <h1>Hello Smolny!</h1>
            </body>
        </html>`;
    },
    async error(ctx) {
        throw Error('Oops!');
    }
}

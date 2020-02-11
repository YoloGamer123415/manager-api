import express from "express";
import { apiGetHandler, apiPostHandler } from "./api";

const PORT = process.env.PORT || 8000

const app = express()

/**
 * Creates an array containing strings for the api.
 *
 * @param {Number} [maxLength=5] The maximum number of arguments in the link.
 * @returns {Array<String>}
 * @example
 * // returns [ '/:command/', '/:command/:argument0/', '/:command/:argument0/:argument1' ]
 * getLinkArray(2)
 */
function getLinkArray(maxLength = 5) {
    let ret = [ '/:command/' ]

    for (let i = 0; i < maxLength; i++) {
        ret.push(`${ret[i]}:argument${i}/`)
    }

    return ret
}

app.get('*', (req, res, next) => {
	console.log('[ REQUEST ]', req.url);

	next();
})

app.get('/', (req, res) => {
    res.status(200).sendFile(`${__dirname}/help.html`, err => {
        if (err) console.error(err)
    })
})

app.get(getLinkArray(), apiGetHandler)

app.post(getLinkArray(), apiPostHandler)

app.listen(PORT, () => {
    console.log(`Listening on port *:${PORT}`)
})

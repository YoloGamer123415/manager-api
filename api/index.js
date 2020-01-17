import { join } from "path";
import { readdirSync } from "fs";
import NotFoundHandler from "./notFoundHandler.js";

const DIR = join(
    __dirname,
    'handlers'
)

/**
 * Check if there is a handler for {@link command}.
 *
 * @param {'get' | 'post'} [type='get']
 * @param {String} command The command specified in the link.
 * @returns {String} The path of the matching handler.
 */
function findHandler(type = 'get', command) {
    let handlers = readdirSync(join(DIR, type))
        .filter(file => file.match(/\.js$/))
        .filter(file => file.match(new RegExp(`^${command}\.js\$`)))
        .map(file => join(DIR, type, file))
    
    return handlers.length > 0
        ? handlers[0]
        : null
}

/**
 * Parse the link parameters to an array with those parameters.
 *
 * @param {Object} params
 */
function parseArguments(params) {
    let ret = []

    for (let param in params) {
        if (
            param.match(/argument/) &&
            params[param]
        ) {
            ret.push(params[param])
        }
    }

    return ret
}

/**
 * Handle the get request and search for a corresponding handler class, to then execute it.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function apiGetHandler(req, res, next) {
    let handlerFile = findHandler('get', req.params.command)

    if (!handlerFile) {
        let handler = new NotFoundHandler(req, res)
        handler.run()
    } else {
        /**
         * @type {import('./handler').default}
         */
        let handler = new (require(handlerFile).default)(req, res)
        
        handler.run(parseArguments(req.params))
    }
}

/**
 * Handle the post request and search for a corresponding handler class, to then execute it.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function apiPostHandler(req, res, next) {
    let handlerFile = findHandler('post', req.params.command)

    if (!handlerFile) {
        let handler = new NotFoundHandler(req, res)
        handler.run()
    } else {
        /**
         * @type {import('./handler').default}
         */
        let handler = new (require(handlerFile).default)(req, res)
        handler.run(parseArguments(req.body))
    }
}

export {
    apiGetHandler,
    apiPostHandler
}

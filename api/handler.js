import { auth } from "../config.json";

const CODES = {
    200: 'OK',
    201: 'Created',

    301: 'Moved Permanently',
    304: 'Not Modified',

    204: 'No Content',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    409: 'Conflict',

    500: 'Internal Server Error',
    501: 'Not Implemented',
    503: 'Service Unavailable'
}

/**
 * Makes a Handler class which can handle a api request.
 *
 * @class Handler
 */
class Handler {
    /**
     *Creates an instance of Api.
     
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {Boolean} checkAuth Whether or not to check if the authentication is valid.
     * @memberof Handler
     */
    constructor(req, res, checkAuth = true) {
        this.req = req
        this.res = res
        this.statusCode = 200
        this.alreadySend = false

        if (checkAuth && !(
            this.req.headers &&
            this.req.headers['x-token'] &&
            this.req.headers['x-token'] === auth.token
        )) {
            this.status(401).error('')
        }
    }

    /**
     * Set the statuscode for the response. Default is 200.
     *
     * @param {number} [code=200]
     * @returns {this}
     * @memberof Handler
     */
    status(code = 200) {
        this.statusCode = code

        return this
    }

    /**
     * Send an error as the response in stead of normal data.
     *
     * @param {String} [error=null] The error to send with the response. If null, there will be tried to get a message on the basis of the response code. If that doesn't work, it becomes "An unknown error occurred".
     * @memberof Handler
     */
    error(error = null) {
        if (!this.alreadySend) {
            this.alreadySend = true

            if (this.statusCode < 400 || this.statusCode > 599) {
                this.status(500)
            }

            if (!error) {
                if (this.statusCode in CODES) {
                    error = CODES[this.statusCode]
                } else {
                    error = 'An unknown error occurred'
                }
            }

            this.res.status(this.statusCode).send({
                uri: this.req.url,
                code: this.statusCode,
                error: error,
                data: null
            })
        }
    }

    /**
     * Send some data as a response.
     *
     * @param {Array<String>} [data=null] The response to send. If null, there will be tried to get a message on the basis of the response code. If that doesn't work, it remaines "null".
     * @memberof Handler
     */
    send(data = null) {
        if (!this.alreadySend) {
            this.alreadySend = true

            if (!data) {
                if (this.statusCode in CODES) {
                    data = CODES[this.statusCode]
                } else {
                    data = 'An unknown error occurred'
                }
            }

            this.res.status(this.statusCode).send({
                uri: this.req.url,
                code: this.statusCode,
                error: null,
                data: data
            })
        }
    }

    /**
     * Run the handler.
     *
     * @param {Array<any>} [args] The arguments to pass to the run function.
     * @memberof Handler
     */
    run(args) {
        this.status(501).send()
    }
}

export default Handler

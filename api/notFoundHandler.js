import Handler from "./handler";

/**
 * Create a handler for a handler which does not exsist.
 *
 * @class NotFoundHandler
 * @extends {Handler}
 */
class NotFoundHandler extends Handler {
    /**
     * Creates an instance of NotFoundHandler.
     * 
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @memberof NotFoundHandler
     */
    constructor(req, res) {
        super(req, res, false)
    }

    run() {
        this.status(404).error()
    }
}

export default NotFoundHandler

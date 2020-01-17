import Handler from "../../handler";

class TestHandler extends Handler {
    /**
     * Creates an instance of TestHandler.
     * 
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @memberof TestHandler
     */
    constructor(req, res) {
        super(req, res)
    }

    /**
     * Run the handler.
     *
     * @param {Array<any>} agrs
     * @memberof TestHandler
     */
    run(agrs) {
        this.send(agrs)
    }
}

export default TestHandler

import Handler from "../../handler";
import Gmail from "../../Google/Gmail";

/**
 *
 *
 * @class FetchMailsHandler
 * @extends {Handler}
 */
class FetchMailsHandler extends Handler {
    /**
     * Creates an instance of FetchMailsHandler.
     * 
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @memberof FetchMailsHandler
     */
    constructor(req, res) {
        super(req, res)
    }

    run(args) {
        if (this.mayRun) {
            let gmail = new Gmail()

            if (!args[0]) {
                gmail.getAllMails().then(res => {
                    this.send({
                        emails: res,
                        length: res.length
                    })
                })
                .catch(err => {
                    console.error(err)
                    this.error(err)
                })
            } else
            if (args[0] == 'unread') {
                gmail.getUnreadMails().then(res => {
                    this.send({
                        emails: res,
                        length: res.length
                    })
                })
                .catch(err => {
                    console.error(err)
                    this.error(err)
                })
            } else {
                gmail.getMailsById(args[0]).then(res => {
                    this.send(res)
                })
                .catch(err => {
                    console.error(err)
                    this.error(err)
                })
            }
        }
    }
}

export default FetchMailsHandler

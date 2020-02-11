/**
 * @typedef {String} labelId
 */

class MailUsermailadress {
    /**
     * Creates an instance of MailUsermailadress.
     * 
     * @param {String} mailPart
     * @memberof MailUsermailadress
     */
    constructor(mailPart) {
        if (mailPart.match(/.+ <(.+)>/)) {
            let mail = mailPart.replace(/.+ <(.+)>/, '$1').trim()
            let name = mailPart.replace(/<(.+)>/, '').trim()
        
            /**
             * @type {String?}
             */
            this.name = name
            /**
             * @type {String}
             */
            this.mail = mail
        } else {
            /**
             * @type {String?}
             */
            this.name = null
            /**
             * @type {String}
             */
            this.mail = mailPart.trim()
        }
    }
}

/**
 * @typedef {Object} MailMessageOptions
 * @property {String} short
 * @property {String} text
 * @property {String} html
 */

/**
 * @class MailMessage
 */
class MailMessage {
    /**
     * Creates an instance of MailMessage.
     * 
     * @param {MailMessageOptions} options
     * @memberof MailMessage
     */
    constructor(options) {
        this.short = options.short
        this.text = Buffer.from(options.text, 'base64').toString('base64')
        this.html = options.html
            ? Buffer.from(options.html, 'base64').toString('base64')
            : null
    }
}

/**
 * @typedef {Object} MailOptions
 * @property {String} id
 * @property {Array<labelId>} labelIds
 * @property {Date} received
 * @property {Array<MailUsermailadress>} to
 * @property {MailUsermailadress} from
 * @property {String} subject
 * @property {MailMessage} message
 */

/**
 * @class Mail
 */
class Mail {
    /**
     * Creates an instance of Mail.
     * 
     * @param {MailOptions} options
     * @memberof Mail
     */
    constructor(options) {
        this.id = options.id
        this.labelIds = options.labelIds
        this.received = options.received
        this.to = options.to
        this.from = options.from
        this.subject = options.subject
        this.message = options.message
    }
}

export default Mail
export {
    MailMessage,
    MailUsermailadress
}

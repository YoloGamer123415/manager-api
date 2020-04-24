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

class File {
    /**
     * Creates an instance of File.
     * 
     * @param {import('googleapis').gmail_v1.Schema$MessagePart} options
     * @memberof File
     */
    constructor(options) {
        this.name = options.filename;
        this.mimeType = options.mimeType;
        this.id = options.body.attachmentId;
    }
}

/**
 * The format Google returns is weird base64 (...?), so we parse it into a normal string, because if we turn it back into base64, the html escaped characters look weird.
 * @param {String} str The weird base64 format.
 */
const parseBase64 = str => Buffer.from(str, 'base64').toString();

/**
 * @typedef {Object} MailMessageOptions
 */

/**
 * @class MailMessage
 */
class MailMessage {
    /**
     * Creates an instance of MailMessage.
     * 
     * @param {import('googleapis').gmail_v1.Schema$Message} options
     * @memberof MailMessage
     */
    constructor(options) {
        this.preview = options.snippet || null;
        this.text = null;
        this.html = null;
        this.files = [];

        if (!options.payload.parts) {
            switch ( options.payload.mimeType.replace(/.+\//g, '') ) {
                case 'text':
                    this.text = parseBase64(options.payload.body.data);
                    break;
                case 'html':
                    this.html = parseBase64(options.payload.body.data).replace(/\r|\n/g, '');
                    break;
                default:
                    this[ options.payload.mimeType.replace(/.+\//g, '') ] = parseBase64(options.payload.body.data);
            }
        } else {
            for (let i = 0; i < options.payload.parts.length; i++) {
                const part = options.payload.parts[i];
    
                if (part.mimeType === 'text/plain')
                    this.text = parseBase64(part.body.data);
                else
                if (part.mimeType === 'text/html')
                    this.html = parseBase64(part.body.data).replace(/\r|\n/g, '');
                else
                if (part.mimeType.match(/application\/.+/g))
                    this.files.push( new File(part) );
            }
        }
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

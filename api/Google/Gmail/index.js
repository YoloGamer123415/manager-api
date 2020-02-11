import Google from "..";
import { google, gmail_v1 } from "googleapis";
import Mail, { MailUsermailadress, MailMessage } from "./Mail";

/**
 * Find the header inside the mail payload.
 *
 * @param {gmail_v1.Schema$Message} mailObject
 * @param {String} key
 */
function findInPayloadHeaders(mailObject, key) {
    return mailObject.payload.headers.find(h => h.name == key).value
}

/**
 * Format the mails with only the nescecary information.
 *
 * @param {Array<gmail_v1.Schema$Message>} mails
 * @returns {Array<Mail>}
 */
function formatMails(mails) {
    let ret = []

    mails.forEach(mail => {
        let to = findInPayloadHeaders(mail, 'To').split(/, +/g)
        let shortMsg = mail.snippet
        let textMsg = null
        let htmlMsg = null
        
        if (mail.payload && mail.payload.parts) {
            textMsg = mail.payload.parts.find(p => p.mimeType == 'text/plain').body.data
            htmlMsg = mail.payload.parts.find(p => p.mimeType == 'text/html').body.data
        } else {
            textMsg = mail.payload.body.data
        }

        ret.push(new Mail({
            id: mail.id,
            labelIds: mail.labelIds,
            received: new Date(findInPayloadHeaders(mail, 'Date')),
            to: to.map(t => new MailUsermailadress(t)),
            from: new MailUsermailadress(findInPayloadHeaders(mail, 'From')),
            subject: findInPayloadHeaders(mail, 'Subject'),
            message: new MailMessage({
                short: shortMsg,
                text: textMsg,
                html: htmlMsg
            })
        }))
    })

    return ret
}

class Gmail extends Google {
    constructor() {
        super()

        this.gmail = google.gmail({
            version: 'v1',
            auth: this.oAuth2Client
        })
    }

    /**
     * Get all the mails.
     *
     * @returns {Promise<gmail_v1.Schema$ListMessagesResponse, any>}
     * @memberof Gmail
     */
    getAllMails() {
        return new Promise((resolve, reject) => {
            this.gmail.users.messages.list({
                userId: 'me',
                includeSpamTrash: false
            }).then(m => m.data.messages)
                .then(res => {
                    resolve(res)
                })
                .catch(reject)
        })
    }

    /**
     * Get all the unread emails.
     *
     * @returns {Promise<gmail_v1.Schema$ListMessagesResponse, any>}
     * @memberof Gmail
     */
    getUnreadMails() {
        return new Promise((resolve, reject) => {
            this.gmail.users.messages.list({
                userId: 'me',
                includeSpamTrash: false,
                q: 'is:unread category:primary'
            }).then(m => m.data.messages)
                .then(res => {
                    resolve(res)
                })
                .catch(reject)
        })
    }

    /**
     * Get a mail by its id.
     *
     * @param {String} id
     * @returns {Promise<gmail_v1.Schema$ListMessagesResponse, any>}
     * @memberof Gmail
     */
    getMailsById(id) {
        if (!id) {
            return Promise.reject(`No id specified`)
        } else {
            return new Promise((resolve, reject) => {
                this.gmail.users.messages.get({
                    userId: 'me',
                    id,
                    includeSpamTrash: false
                }).then(m => m.data)
                    .then(res => {
                        resolve(formatMails([ res ])[0])
                    })
                    .catch(reject)
            })
        }
    }
}

export default Gmail

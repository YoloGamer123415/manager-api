import Google from "..";
import { google } from "googleapis";

class Gmail extends Google {
    constructor() {
        super()

        this.gmail = google.gmail({
            version: 'v1',
            auth: this.oAuth2Client
        })
    }

    getNewMails() {
        return new Promise((resolve, reject) => {
            
        })
    }
}
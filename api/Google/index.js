import { installed as credentials } from "../../credentials.json";
import * as token from "../../token.json";
import { google } from "googleapis";

class Google {
    constructor() {
        this.oAuth2Client = new google.auth.OAuth2(
            credentials.client_id,
            credentials.client_secret,
            credentials.redirect_uris[0]
        )

        this.oAuth2Client.setCredentials(token)
    }
}

export default Google

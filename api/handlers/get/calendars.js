import Handler from "../../handler";
import Agenda from "../../Google/Agenda";

class FetchCalendarsHandler extends Handler {
    constructor(req, res) {
        super(req, res);
    }

    /**
     *
     *
     * @override
     * @memberof FetchCalendarsHandler
     */
    run() {
        if (this.mayRun) {
            let agenda = new Agenda();

            agenda.getCalendars().then(res => {
                this.send({ calendars: res })
            })
            .catch(err => {
                console.error(err);
                this.error(err);
            })
        }
    }
}

export default FetchCalendarsHandler;

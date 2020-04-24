import Handler from "../../handler";
import Agenda from "../../Google/Agenda";

const ISO_DATE_REGEX = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;

class FetchBusyHandler extends Handler {
    /**
     * Creates an instance of FetchBusyHandler.
     * 
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @memberof FetchBusyHandler
     */
    constructor(req, res) {
        super(req, res);
    }

    /**
     *
     *
     * @param {String[]} args
     * @memberof FetchBusyHandler
     */
    run(args) {
        if (this.mayRun) {
            let hasCalendarId = args[0] && !ISO_DATE_REGEX.test(args[0]);

            let calendarId = hasCalendarId && args[0];
            let startDate = hasCalendarId ? args[1] : args[0];

            let agenda = new Agenda(calendarId);

            agenda.getBusyTime(startDate)
                .then(res => {
                    this.send({hours: res});
                })
                .catch(err => {
                    console.error(err);
                    this.error(err);
                })
        }
    }
}

export default FetchBusyHandler;

import Handler from '../../handler';
import Agenda from '../../Google/Agenda';

const ISO_DATE_REGEX = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;

/**
 * The handler for the testcase.
 *
 * @class FetchAppointmentsHandler
 * @extends {Handler}
 */
class FetchAppointmentsHandler extends Handler {
    /**
     * Creates an instance of FetchAppointmentsHandler.
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @memberof FetchAppointmentsHandler
     */
    constructor(req, res) {
        super(req, res);
    }

    /**
     * Get the appointments between {@link data[0]} and {@link data[1]}.
     *
     * @param {Array<String>} [data=null] The time for the appointments. {@link data[0]} is the starttime and {@link data[1]} is the endtime. Will default to the start and endtime of the current day.
     * @memberof Handler
     */
    run(args) {
        if (this.mayRun) {
            let hasCalendarId = args[0] && !ISO_DATE_REGEX.test(args[0]);

            let calendarId = hasCalendarId && args[0];
            let startDate = hasCalendarId ? args[1] : args[0];
            let endDate = hasCalendarId ? args[2] : args[1];

            let agenda = new Agenda(calendarId);

            agenda
                .getAppointments(startDate, endDate)
                .then(res => {
                    this.send({ appointments: res });
                })
                .catch(err => {
                    console.error(err);
                    this.error(err);
                });
        }
    }
}

export default FetchAppointmentsHandler;

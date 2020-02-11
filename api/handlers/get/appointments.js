import Handler from "../../handler";
import Agenda from "../../Google/Agenda";

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
        super(req, res)
    }

    /**
     * Get the appointments between {@link data[0]} and {@link data[1]}.
     *
     * @param {Array<String>} [data=null] The time for the appointments. {@link data[0]} is the starttime and {@link data[1]} is the endtime. Will default to the start and endtime of the current day.
     * @memberof Handler
     */
    run(args) {
        if (this.mayRun) {
            let agenda = new Agenda()
    
            agenda.getAppointments(args[0], args[1]).then(res => {
                this.send({ appointments: res})
            })
            .catch(err => {
                console.error(err)
                this.error(err)
            })
        }
    }
}

export default FetchAppointmentsHandler

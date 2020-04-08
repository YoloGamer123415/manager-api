import Handler from '../../handler';
import Tasks from '../../Google/Tasks';

class FetchTasksHandler extends Handler {
    /**
     * Creates an instance of FetchTasksHandler.
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @memberof FetchTasksHandler
     */
    constructor(req, res) {
        super(req, res);
    }

    /**
     * Run the handler.
     *
     * @param {String[]} [args] The arguments to pass to the run function.
     * @memberof FetchTasksHandler
     */
    run(args) {
        let tasks = new Tasks();

        if (!args[0]) {
            tasks.getAllTasklists()
                .then(res => {
                    this.send({
                        tasklists: res,
                        length: res.length
                    })
                })
                .catch(err => {
                    console.error(err);
                    this.error(err);
                });
        } else {
            tasks.getAllTasks(args[0])
                .then(res => {
                    this.send({
                        id: args[0],
                        tasks: res,
                        length: res.length
                    });
                })
                .catch(err => {
                    
                });
        }
    }
}

export default FetchTasksHandler;

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

    run(args) {
        let tasks = new Tasks();

        tasks.getAllTasks()
            .then(res => {
                this.send({
                    tasks: res,
                    length: res.length
                })
            })
            .catch(err => {
                console.error(err);
                this.error(err);
            });
    }
}

export default FetchTasksHandler;

import NewsApi from "newsapi";
import { news } from "../../../config.json";
import Handler from "../../handler";

/**
 * @typedef {Object} NewsOptions
 * @property {String} source
 * @property {String} author
 * @property {String} title
 * @property {String} description
 * @property {String} url
 * @property {String} image
 */

const DOMAINS = [
    'telegraaf.nl',
    'nos.nl',
    'destentor.nl'
]

class News {
    /**
     * Creates an instance of News.
     * 
     * @param {NewsOptions} options
     * @memberof News
     */
    constructor(options) {
        this.source = options.source
        this.author = options.author
        this.title = options.title
        this.description = options.description
        this.url = options.url
        this.image = options.image
    }
}

/**
 *
 *
 * @class FetchNewsHandler
 * @extends {Handler}
 */
class FetchNewsHandler extends Handler {
    /**
     * Creates an instance of FetchNewsHandler.
     * 
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @memberof FetchNewsHandler
     */
    constructor(req, res) {
        super(req, res)

        this.newsapi = new NewsApi(news.key).v2
    }

    run(args) {
        if (this.mayRun) {
            this.newsapi.everything({
                // country: 'nl',
                domains: DOMAINS.filter(d => d).join(',')
            })
                .then(res => {
                    let temp = []

                    res.articles.forEach(article => {
                        let news = new News({
                            source: article.source.name,
                            author: article.author,
                            title: article.title,
                            description: article.description,
                            url: article.url,
                            image: article.urlToImage
                        })

                        temp.push(news)
                    })

                    this.send({
                        news: temp,
                        length: temp.length
                    })
                })
                .catch(err => {
                    console.error(err)
                    this.error(err)
                })
        }
    }
}

export default FetchNewsHandler

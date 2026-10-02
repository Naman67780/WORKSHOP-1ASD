const cache = {};

const TTL = 60 * 1000;


function cacheMiddleware(req, res, next) {

    const key = req.originalUrl;

    const cachedEntry = cache[key];


    if (cachedEntry) {

        const age = Date.now() - cachedEntry.createdAt;


        if (age < TTL) {

            res.set("X-Cache", "HIT");

            return res.json(cachedEntry.data);

        }
        delete cache[key];

    }
    res.set("X-Cache", "MISS");


    const originalJson = res.json.bind(res);


    res.json = (data) => {

        cache[key] = {
            data: data,
            createdAt: Date.now()
        };

        return originalJson(data);

    };


    next();

}


function invalidateCache() {

    Object.keys(cache).forEach((key) => {

        delete cache[key];

    });

}


module.exports = {
    cacheMiddleware,
    invalidateCache
};
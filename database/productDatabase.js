const fs = require("node:fs/promises");

const path = require("node:path");

const pathToFile = path.join(
    __dirname,
    "..",
    "db.json"
);


async function readData() {

    const data = await fs.readFile(
        pathToFile,
        "utf8"
    );

    return JSON.parse(data);

}


async function writeData(data) {

    await fs.writeFile(
        pathToFile,
        JSON.stringify(data, null, 2),
        "utf8"
    );

}


module.exports = {
    readData,
    writeData
};
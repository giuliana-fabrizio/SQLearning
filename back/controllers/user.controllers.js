const services = require("../services/user.services");

const getFields = (_, res) => {
    services.getFields((error, data) => {
        if (error) {
            return res.status(500).send({ success: 0, data: error });
        }
        return res.status(200).send({ success: 1, data: data });
    });
}

const insert = (req, res) => {
    services.insert(req.body, (error, data) => {
        if (error) {
            if (error.code === ("EMAIL_ALREADY_USED")) {
                return res.status(409).send({ success: 0, data: error });
            }
            return res.status(500).send({ success: 0, data: error });
        }
        return res.status(200).send({ success: 1, data: data });
    });
}

module.exports = {
    getFields: getFields,
    insert: insert
}
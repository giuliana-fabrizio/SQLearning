const services = require("../services/user.services");

const getFields = (req, res) => {
    services.getFields((error, data) => {
        if (error) {
            return res.status(500).send({ success: 0, data: error });
        }
        return res.status(200).send({ success: 1, data: data });
    });
}

module.exports = {
    getFields: getFields
}
const services = require("../services/user.service");

const getFields = (_, res) => {
    services.getFields((error, data) => {
        if (error) {
            return res.status(500).send({ success: 0, data: error });
        }
        return res.status(200).send({ success: 1, data: data });
    });
}

const getEmail = (req, res) => {
    const email = req.params.email;
    services.getEmail(email, (error, data) => {
        if (error) {
            return res.status(404).send({ success: 0, data: error });
        }
        return res.status(200).send({ success: 1, data: data });
    });
}

const getUser = (req, res) => {
    const id = req.params.id;
    services.getUser(id, (error, data) => {
        if (error) {
            return res.status(404).send({ success: 0, data: error });
        }
        return res.status(200).send({ success: 1, data: data });
    });
}

const insert = (req, res) => {
    services.insert(req.body.user, (error, data) => {
        if (error) {
            if (error.code === "EMAIL_ALREADY_USED") {
                return res.status(409).send({ success: 0, data: error });
            }
            return res.status(500).send({ success: 0, data: error });
        }
        return res.status(200).send({ success: 1, data: data });
    });
}

const update = (req, res) => {
    services.update(req.body.user, (error, data) => {
        if (error) {
            if (error.code === "USER_NOT_FOUND") {
                return res.status(404).send({ success: 0, data: error });
            }
            return res.status(500).send({ success: 0, data: error });
        }
        return res.status(200).send({ success: 1, data: data });
    });
}

module.exports = {
    getFields: getFields,
    getEmail: getEmail,
    getUser: getUser,
    insert: insert,
    update: update
}
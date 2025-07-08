const db = require("../db/connect");
const queries = require("../queries/user.queries");

const getFields = (callback) => {
    db.all(queries.getFields, (error, res) => {
        if (error) {
            return callback(error);
        }
        return callback(null, res);
    });
}

const getEmail = (email, callback) => {
    db.get(queries.mailFree, [email], (_, res) => {
        if (res) {
            return callback(null, res);
        }
        return callback({
            code: "EMAIL_NOT_FOUND",
            message: "Erreur: adresse e-mail non trouvée.",
            details: "Veuillez saisir une adresse e-mail valide ou créer un compte."
        })
    });
}

const getUser = (id, callback) => {
    db.get(queries.getUser, [id], (_, res) => {
        if (res) {
            return callback(null, res);
        }
        return callback({
            code: "USER_NOT_FOUND",
            message: "Erreur: utilisateur non trouvé.",
            details: "Veuillez saisir un identifiant valide."
        })
    });
}

const insert = (user, callback) => {
    db.get(queries.mailFree, [user.mail], (_, res) => {
        if (res) {
            return callback({
                code: "EMAIL_ALREADY_USED",
                message: "Erreur: adresse e-mail déjà utilisée.",
                details: "Veuillez en choisir une autre ou utiliser la fonction mot de passe oublié."
            });
        }

        db.run(queries.insert, [
            user.id,
            user.firstname,
            user.name,
            user.mail,
            user.avatar,
            false,
            user.id_field
        ], (error, res) => {
            if (error) {
                return callback(error);
            }
            return callback(null, res);
        });
    });
}

const update = (user, callback) => {
    db.get(queries.getUser, [user.id], (_, res) => {
        if (!res) {
            return callback({
                code: "USER_NOT_FOUND",
                message: "Erreur: utilisateur non trouvé.",
                details: "Veuillez saisir un identifiant valide."
            });
        }

        db.run(queries.update, [
            user.firstname,
            user.name,
            user.avatar,
            user.is_admin,
            user.id_field,
            user.id
        ], (error) => {
            if (error) {
                return callback(error);
            }
            return callback(null, "Champs modifié avec succès");
        });
    });
}

module.exports = {
    getFields: getFields,
    getEmail: getEmail,
    getUser: getUser,
    insert: insert,
    update: update
}
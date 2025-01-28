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

const insert = (user, callback) => {
    db.get(queries.mailFree, [user.mail], (_, res) => {
        if (res) {
            return callback({
                code: "EMAIL_ALREADY_USED",
                message: "Erreur: adresse e-mail déjà utilisée.",
                details: "Veuillez en choisir une autre ou utiliser la fonction mot de passe oublié."
            });
        }

        if (user.check_password != user.password) {
            return callback({
                code: "PASSWORD_MISMATCH",
                message: "Les mots de passe ne correspondent pas.",
                details: "Assurez-vous que les deux champs de mot de passe sont identiques."
            });            
        }

        db.run(queries.insert, [
            user.firstname,
            user.name,
            user.mail,
            user.password,
            user.avatar,
            false,
            user.id_field
        ], (error, res) => {
            if (error) {$
                return callback(error);
            }
            return callback(null, res);
        });
    });
}

module.exports = {
    getFields: getFields,
    insert: insert
}
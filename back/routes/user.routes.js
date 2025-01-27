const express = require("express");
const controllers = require("../controllers/user.controllers");

const router = express.Router();

/**
 * @swagger
 * /user/getFields:
 *   get:
 *      description: Use to list all fields
 *      tags:
 *          - USER
 *      responses:
 *          "200":
 *              description: Fields listed successfully
 *          "500":
 *              description: Internal server error
 */
router.get("/getFields", controllers.getFields);

module.exports = router;
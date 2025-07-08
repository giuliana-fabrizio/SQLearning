const express = require("express");
const controllers = require("../controllers/db.controllers");

const router = express.Router();

/**
 * @swagger
 * /database:
 *   get:
 *      description: Use to list all databases
 *      tags:
 *          - DATABASE
 *      responses:
 *          "200":
 *              description: Databases listed successfully
 *          "500":
 *              description: Internal server error
 */
router.get("/", controllers.getDatabases);

module.exports = router;
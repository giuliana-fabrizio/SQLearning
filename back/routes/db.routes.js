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

/**
 * @swagger
 * /database/{id}:
 *   delete:
 *      description: Use to delete a database
 *      tags:
 *          - DATABASE
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *      responses:
 *          "200":
 *              description: Database deleted successfully
 *          "500":
 *              description: Internal server error
 */
router.delete("/:id", controllers.deleteDatabase);

module.exports = router;
const express = require("express");
const multer = require('multer');
const controllers = require("../controllers/db.controller");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/')
    },

    filename: function (req, file, callback) {
        callback(null, file.originalname) 
    }
});
const upload = multer({ storage: storage });
router.post("/upload", upload.single('file'), controllers.uploadFile);

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
 * /database:
 *   post:
 *      description: Use to create a database
 *      tags:
 *          - DATABASE
 *      parameters:
 *          - in: body
 *            name: database
 *            schema:
 *              type: object
 *              required:
 *                - database
 *              properties:
 *                  database:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                        example: "Minecraft"
 *                      description:
 *                        type: string
 *                        example: "A wonderful database about different worlds in the game"
 *                      filename:
 *                        type: string
 *                        example: "Minecraft.sql"
 *                      id_user:
 *                        type: string
 *                        example: "wTF90JTLsDlv13cMbb2171ajMdnC"
 *                      questions:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                            label:
 *                              type: string
 *                              example: "Count different worlds"
 *                            expected_result:
 *                              type: string
 *                              example: "3"
 *                            best_answer:
 *                              type: string
 *                              example: "select count(id) as counted from database"
 *      responses:
 *          "200":
 *              description: Database deleted successfully
 *          "500":
 *              description: Internal server error
 */
router.post("/", controllers.createDatabase);

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
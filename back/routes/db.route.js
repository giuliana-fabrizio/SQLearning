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
router.post("/", controllers.createDatabase);
router.put("/:id", controllers.updateDatabase);

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
 *   get:
 *      description: Use to display a database's details
 *      tags:
 *          - DATABASE
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *      responses:
 *          "200":
 *              description: Database's details listed successfully
 *          "500":
 *              description: Internal server error
 */
router.get("/:id", controllers.getDatabase);

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
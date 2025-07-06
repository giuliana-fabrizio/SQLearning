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

/**
 * @swagger
 * /user/get_with_email/{email}:
 *   get:
 *      description: Use to verify user's email
 *      tags:
 *          - USER
 *      parameters:
 *          - in: path
 *            name: email
 *            type: string
 *            required: true
 *      responses:
 *          "200":
 *              description: User gotten successfully
 *          "404":
 *              description: User not found
 *          "500":
 *              description: Internal server error
 */
router.get("/get_with_email/:email", controllers.getEmail);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *      description: Use to get an user by his uid
 *      tags:
 *          - USER
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *      responses:
 *          "200":
 *              description: User gotten successfully
 *          "404":
 *              description: User not found
 *          "500":
 *              description: Internal server error
 */
router.get("/:id", controllers.getUser);

/**
 * @swagger
 * /user/create:
 *   post:
 *      description: Use to register a user
 *      tags:
 *          - USER
 *      parameters:
 *          - in: body
 *            name: user
 *            schema:
 *              type: object
 *              required:
 *                - user
 *              properties:
 *                  user:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        example: "mSc99LTgQdZnQoUwOwy"
 *                      firstname:
 *                        type: string
 *                        example: "Jeanne"
 *                      name:
 *                        type: string
 *                        example: "Dupon"
 *                      mail:
 *                        type: string
 *                        example: "jeanne.dupon@gmail.com"
 *                      avatar:
 *                        type: string
 *                        example: "avatar"
 *                      is_admin:
 *                        type: logical
 *                        example: false
 *                      id_field:
 *                        type: integer
 *                        example: 1
 *      responses:
 *          "200":
 *              description: User added successfully
 *          "500":
 *              description: Internal server error
 */
router.post("/create", controllers.insert);

module.exports = router;
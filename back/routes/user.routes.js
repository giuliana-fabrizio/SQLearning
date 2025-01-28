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
 * /user/create:
 *   post:
 *      description: Use to register a user
 *      tags:
 *          - USER
 *      parameters:
 *          - in: body
 *            name: User
 *            schema:
 *              type: object
 *              required: true
 *              properties:
 *                  firstname:
 *                      type: string
 *                      example: "Jeanne"
 *                  name:
 *                      type: string
 *                      example: "Dupon"
 *                  mail:
 *                      type: string
 *                      example: "jeanne.dupon@gmail.com"
 *                  password:
 *                      type: string
 *                      example: "password"
 *                  avatar:
 *                      type: string
 *                      example: "avatar"
 *                  is_admin:
 *                      type: logical
 *                      example: false
 *                  id_field:
 *                      type: integer
 *                      example: 1
 *      responses:
 *          "200":
 *              description: User added successfully
 *          "500":
 *              description: Internal server error
 */
router.post("/create", controllers.insert);

module.exports = router;
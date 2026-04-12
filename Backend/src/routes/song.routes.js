const express = require("express")
const upload = require("../middlewares/upload.middleware")
const songControllers = require("../controllers/song.controller")

const router = express.Router()

/**
 * POST/api/songs
 */
router.post("/",upload.single("song"), songControllers.uploadSong)

router.get("/", songControllers.getSong)

module.exports = router
const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
    res.json({ message : "Bonjour a tous"});
});

router.post("/", (req, res) => {
    res.json({ message : req.body.message });
});

router.put("/:id", (req, res) => {
    res.json({ message : "Projets modifié", id : req.params.id});
});

router.delete("/:id", (req, res) => {
    res.json({ message : "Projets supprimé", id : req.params.id});
});

module.exports = router;
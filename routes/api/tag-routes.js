const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// GET all tags with associated Product data
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET - this route finds a single tag by its `id`
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    //if tag doesn't exist, it will send back an error message
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id" });
      return;
    }
    //sends back requested data
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST - this route creates a new tag
router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT - update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    //if the tag doesn't exist, it will send back an error message
    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id" });
      return;
    }
    //sends back updated data
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    //check if tag exists, if it doesn't it will return an error message
    if (!tagData) {
      res.status(404).json({ message: "No tag found under this id" });
      return;
    }
    //sends back rows affected
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// GET all categories with their products
router.get("/", async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product, as: "products" }],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET category by id and it'll show the associated products as well
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    //if category doesn't exist, it will send back an error message and stop running
    if (!category) {
      res.status(404).json("Error 404: Category not found");
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST - creates a new category
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT - updates a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // check if the category exists, if it doesn't it will send back an error message and stop running the request
    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE - deletes a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    // check if the category exists, if it doesn't it will send back an error message and stop running the request
    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id" });
      return;
    }
    //sends back rows in db affected
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

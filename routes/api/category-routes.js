const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // GET all categories with their products
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product, as: "products" }],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  //GET category by id and it'll show the associated products as well
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

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;

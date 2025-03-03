import { sql } from "../lib/db.js";

const getIngredientById = async (id) => {
  const ingredient = await sql`
    SELECT * FROM recipe_ingredients WHERE id = ${id};`;
  return ingredient.length > 0 ? ingredient[0] : null;
};

export const create = async (req, res) => {
  const { name, quantity, unit, recipe_id } = req.body;
  const { id } = req.user;
  try {
    if (!name || !quantity || !unit || !recipe_id)
      return res.status(400).json({ message: "All Fields Required" });
    if (quantity < 0)
      return res.status(400).json({ message: "Quantity Must Be At Least 0" });
    const ingredient = await sql`
      INSERT INTO recipe_ingredients (name, quantity, unit, recipe_id)
      VALUES (${name}, ${quantity}, ${unit}, ${recipe_id}) RETURNING *;`;
    if (ingredient.length === 0)
      return res.status(400).json({ message: "Error Creating Ingredient" });
    res.status(201).json(ingredient[0]);
  } catch (error) {
    console.log("Error in create: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const read = async (req, res) => {
  try {
    const ingredients = await sql`
      SELECT ri.*, r.name AS recipe_name, u.username AS user_name
      FROM recipe_ingredients ri
      JOIN recipes r ON r.id = ri.recipe_id
      JOIN users u ON u.id = r.user_id;`;
    if (ingredients.length === 0)
      return res.status(400).json({ message: "Error Reading Ingredients" });
    res.status(200).json(ingredients);
  } catch (error) {
    console.log("Error in read: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const readById = async (req, res) => {
  const { id: ingredientId } = req.params;
  try {
    const ingredient = await sql`
      SELECT * FROM recipe_ingredients WHERE id = ${ingredientId} LIMIT 1;`;
    if (ingredient.length === 0)
      return res.status(404).json({ message: "Ingredient Not Found" });
    res.status(200).json(ingredient[0]);
  } catch (error) {
    console.log("Error in readById: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const update = async (req, res) => {
  const { name, quantity, unit } = req.body;
  const { id: ingredientId } = req.params;
  const { id } = req.user;
  try {
    if (quantity < 0)
      return res.status(400).json({ message: "Quantity Must Be At Least 0" });
    const ingredient = await getIngredientById(ingredientId);
    if (!ingredient)
      return res.status(404).json({ message: "Ingredient Not Found" });
    const recipe = await sql`
      SELECT * FROM recipes WHERE id = ${ingredient.recipe_id} AND user_id = ${id};`;
    if (!recipe.length)
      return res
        .status(403)
        .json({ message: "Unauthorized to modify this ingredient" });
    const updatedIngredient = await sql`
      UPDATE recipe_ingredients SET name = ${name}, quantity = ${quantity}, unit = ${unit} 
      WHERE id = ${ingredientId} RETURNING *;`;
    if (updatedIngredient.length === 0)
      return res.status(400).json({ message: "Error Updating Ingredient" });
    res.status(200).json(updatedIngredient[0]);
  } catch (error) {
    console.log("Error in update: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteById = async (req, res) => {
  const { id: ingredientId } = req.params;
  const { id } = req.user;
  try {
    const ingredient = await getIngredientById(ingredientId);
    if (!ingredient)
      return res.status(404).json({ message: "Ingredient Not Found" });
    const recipe = await sql`
      SELECT * FROM recipes WHERE id = ${ingredient.recipe_id} AND user_id = ${id};`;
    if (!recipe.length)
      return res
        .status(403)
        .json({ message: "Unauthorized To Delete Ingredient" });
    const deletedIngredient = await sql`
      DELETE FROM recipe_ingredients WHERE id = ${ingredientId} RETURNING *;`;
    if (deletedIngredient.length === 0)
      return res.status(400).json({ message: "Error Deleting Ingredient" });
    res.status(200).json({ message: "Ingredient Deleted Successfully" });
  } catch (error) {
    console.log("Error in deleteById: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

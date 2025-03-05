import { sql } from "../lib/db.js";
import cloudinary from "../lib/cloudinary.js";

export const create = async (req, res) => {
  const { name, description, cooking_time, preparation_time, type, image } =
    req.body;
  const { id } = req.user;
  try {
    if (!name || !cooking_time || !preparation_time || !type || !image) {
      return res.status(400).json({ message: "All Fields Required" });
    }
    const upload = await cloudinary.uploader.upload(image);
    const recipe = await sql`
      INSERT INTO recipes (name, description, cooking_time, preparation_time, type, image, user_id)
      VALUES (${name}, ${description}, ${cooking_time}, ${preparation_time}, ${type}, ${upload.secure_url}, ${id})
      RETURNING *;
    `;
    if (recipe.length === 0) {
      return res.status(400).json({ message: "Error Creating Recipe" });
    }
    console.log(`Successfully Created Recipe`);
    res.status(201).json(recipe[0]);
  } catch (error) {
    console.log("Error in create : ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const read = async (req, res) => {
  try {
    const recipes = await sql`
      SELECT 
        r.*, 
        u.username AS owner_username,
        array_agg(
          jsonb_build_object(
            'id', ri.id,
            'name', ri.name,
            'quantity', ri.quantity,
            'unit', ri.unit
          )
        ) AS ingredients
      FROM 
        recipes AS r
      LEFT JOIN 
        recipe_ingredients AS ri ON r.id = ri.recipe_id
      LEFT JOIN 
        users AS u ON u.id = r.user_id
      GROUP BY 
        r.id, u.username;
    `;
    if (recipes.length === 0) {
      return res.status(404).json({ message: "Recipes Not Found" });
    }
    console.log("Successfully Read Recipes");
    res.status(200).json(recipes);
  } catch (error) {
    console.log("Error in read: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const readById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await sql`
      SELECT 
        r.*, 
        u.username AS owner_username,
        array_agg(
          jsonb_build_object(
            'id', ri.id,
            'name', ri.name,
            'quantity', ri.quantity,
            'unit', ri.unit
          )
        ) AS ingredients
      FROM 
        recipes AS r
      LEFT JOIN 
        recipe_ingredients AS ri ON r.id = ri.recipe_id
      LEFT JOIN 
        users AS u ON u.id = r.user_id
      WHERE 
        r.id = ${id}
      GROUP BY 
        r.id, u.username;
    `;
    if (recipe.length === 0) {
      return res.status(404).json({ message: "Recipe Not Found" });
    }
    console.log("Successfully Read Recipe");
    res.status(200).json(recipe[0]);
  } catch (error) {
    console.log("Error in readById: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const update = async (req, res) => {
  const { name, description, cooking_time, preparation_time, type } = req.body;
  const { id: recipeId } = req.params;
  const { id } = req.user;
  try {
    const recipe = await sql`
      SELECT * FROM recipes 
      WHERE id = ${recipeId} AND user_id = ${id} 
      LIMIT 1;
    `;
    if (recipe.length === 0) {
      return res.status(404).json({ message: "Recipe Not Found" });
    }
    const updatedRecipe = await sql`
      UPDATE recipes
      SET name = ${name}, description = ${description}, cooking_time = ${cooking_time}, 
          preparation_time = ${preparation_time}, type = ${type}
      WHERE id = ${recipeId}
      RETURNING *;
    `;
    if (updatedRecipe.length === 0) {
      return res.status(400).json({ message: "Error Updating Recipe" });
    }
    console.log(`Successfully Updated Recipe: ${updatedRecipe[0].name}`);
    res.status(200).json(updatedRecipe[0]);
  } catch (error) {
    console.log("Error in update: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteById = async (req, res) => {
  const { id: recipeId } = req.params;
  const { id } = req.user;
  try {
    const deletedRecipe = await sql`
      DELETE FROM recipes 
      WHERE id = ${recipeId} AND user_id = ${id}
      RETURNING *;
    `;
    if (deletedRecipe.length === 0) {
      return res
        .status(404)
        .json({ message: "Recipe Not Found or Unauthorized" });
    }
    console.log("Successfully Deleted Recipe");
    res.status(200).json({ message: "Successfully Deleted Recipe" });
  } catch (error) {
    console.log("Error in deleteById: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

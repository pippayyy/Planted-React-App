import { connection } from "../connect.js";

export const getDiscount = async (discountCode) => {
  const [discount] = await connection.execute(
    `SELECT * FROM discount_code WHERE discount_code = ?;`,
    [discountCode]
  );

  return discount;
};

export const addDiscount = async (code, value, status, dateCurrent, userId) => {
  const [response] = await connection.query(
    "INSERT INTO `discount_code` (discount_code,discount_value,discount_status,created_on,created_by,modified_on,modified_by) VALUES (?,?,?,?,?,?,?)",
    [code, value, status, dateCurrent, userId, dateCurrent, userId],
    (error, res) => {
      if (error) return res.json({ error: error });
    }
  );

  return response;
};

export const updateDiscount = async (
  discountid,
  code,
  value,
  status,
  dateCurrent,
  userId
) => {
  const [response] = await connection.query(
    "UPDATE `discount_code` SET discount_code = ?, discount_value = ?, discount_status = ?, created_on = ?,created_by = ?,modified_on = ?,modified_by = ? WHERE discount_id = ?",
    [code, value, status, dateCurrent, userId, dateCurrent, userId, discountid],
    (error, res) => {
      if (error) return res.json({ error: error });
    }
  );

  return response;
};

export const delDiscount = async (discountId) => {
  const [response] = await connection.query(
    "DELETE FROM `discount_code` WHERE discount_id = ?",
    [discountId],
    (error, res) => {
      if (error) return res.json({ error: error });
    }
  );

  return response;
};

export const updateCategory = async (
  categoryid,
  name,
  img,
  status,
  dateCurrent,
  userId
) => {
  const [response] = await connection.query(
    "UPDATE `categories` SET name = ?, img = ?, status_active = ?, created_on = ?,created_by = ?,modified_on = ?,modified_by = ? WHERE id = ?",
    [name, img, status, dateCurrent, userId, dateCurrent, userId, categoryid],
    (error, res) => {
      if (error) return res.json({ error: error });
    }
  );

  return response;
};

export const getCategory = async (categoryName) => {
  const [discount] = await connection.execute(
    `SELECT * FROM categories WHERE name = ?;`,
    [categoryName]
  );

  return discount;
};

export const addCategory = async (name, status, img, dateCurrent, userId) => {
  const [response] = await connection.query(
    "INSERT INTO `categories` (name,status_active,img,created_on,created_by,modified_on,modified_by) VALUES (?,?,?,?,?,?,?)",
    [name, status, img, dateCurrent, userId, dateCurrent, userId],
    (error, res) => {
      if (error) return res.json({ error: error });
    }
  );

  return response;
};

export const delCategory = async (categoryId) => {
  const [response] = await connection.query(
    "DELETE FROM `categories` WHERE id = ?",
    [categoryId],
    (error, res) => {
      if (error) return res.json({ error: error });
    }
  );

  return response;
};

export const addProduct = async (
  name,
  category,
  descrip,
  img,
  qty,
  price,
  discount,
  dateCurrent,
  userId
) => {
  const [response] = await connection.query(
    "INSERT INTO `product` (name,category_id,description,img,stock,price,discount_percent,created_on,created_by,modified_on,modified_by) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    [
      name,
      category,
      descrip,
      img,
      qty,
      price,
      discount,
      dateCurrent,
      userId,
      dateCurrent,
      userId,
    ],
    (error, res) => {
      if (error) return res.json({ error: error });
    }
  );

  return response;
};

export const updateProduct = async (
  id,
  name,
  category,
  descrip,
  qty,
  price,
  discount,
  dateCurrent,
  userId
) => {
  const [response] = await connection.query(
    "UPDATE `product` SET name = ?, category_id = ?, description = ?, stock = ?, price = ?, discount_percent = ? created_on = ?,created_by = ?,modified_on = ?,modified_by =? WHERE product_id = ?",
    [
      name,
      category,
      descrip,
      qty,
      price,
      discount,
      dateCurrent,
      userId,
      dateCurrent,
      userId,
      id,
    ],
    (error, res) => {
      if (error) return res.json({ error: error });
    }
  );

  return response;
};

export const delProduct = async (productId) => {
  const [response] = await connection.query(
    "DELETE FROM `product` WHERE product_id = ?",
    [productId],
    (error, res) => {
      if (error) return res.json({ error: error });
    }
  );

  return response;
};

export const getProdImg = async (productId) => {
  const [response] = await connection.query(
    `SELECT product_id,img FROM product WHERE product_id = ?;`,
    [productId]
  );

  return response;
};

export const getCategoryImg = async (categoryId) => {
  const [response] = await connection.query(
    `SELECT id,img FROM categories WHERE id = ?;`,
    [categoryId]
  );

  return response;
};

const ShoppingListService = {
  getAllItems(db){
    return db('shopping_list').select('*');
  },

  insertItem(db, newItem){
    return db('shopping_list')
      .insert(newItem)
      .returning('*')
      .then(res => res[0]);
  },

  deleteItem(db, id){
    return db('shopping_list')
      .where({ id })
      .delete();
  },
  getById(db, id){
    return db('shopping_list')
      .where({ id })
      .first();
  },
  updateItem(db, id, newItem) {
      return db('shopping_list')
      .where({ id })
      .update(newItem);
  }
};

module.exports = ShoppingListService;
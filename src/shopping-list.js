require('dotenv').config();
const knex = require('knex');
const ShoppingListService = require('./shopping-list-service');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

ShoppingListService.getAllItems(knexInstance)
  .then(items => console.log(items))
  .then(() =>
    ShoppingListService.insertItem(knexInstance, {
      name: 'test item', 
      price: '3.33', 
      category: 'Breakfast', 
      checked: false, 
      date_added: new Date()
    })
  )
  .then(newItem => {
    console.log(newItem);
    return ShoppingListService.updateItem(
      knexInstance,
      newItem.id,
      { name: 'updated name' })
      .then(() => ShoppingListService
        .getById(knexInstance,newItem.id));
  })
  .then(item => {
    console.log(item);
    return ShoppingListService.deleteItem(knexInstance, item.id);
  })
  .catch(err => console.error(err.message))
  .finally(() => knexInstance.destroy());
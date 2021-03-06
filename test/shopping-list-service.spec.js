const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

const testItems = [
  {
    id: 1,
    name: 'Fish tricks', 
    price: '13.11', 
    category: 'Main', 
    checked: false, 
    date_added: new Date('2029-01-22T16:28:32.615Z'),
  },
  {
    id: 2,
    name: 'Not Dogs', 
    price: '3.13', 
    category: 'Snack', 
    checked: true, 
    date_added: new Date('2100-05-22T16:28:32.615Z'),
  },
  {
    id: 3,
    name: 'SubstiTuna Salad', 
    price: '130.12', 
    category: 'Lunch', 
    checked: false, 
    date_added: new Date('1919-12-22T16:28:32.615Z'),
  },
  {
    id: 4,
    name: 'Tofurkey', 
    price: '30.15', 
    category: 'Breakfast', 
    checked: true, 
    date_added: new Date(),
  },
];

describe('Shoppinglist service object', function() {
  let db;

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context('Given \'shopping_list\' has data', () => {
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testItems);
    });

    it('getAllItems() resolves all items from \'shopping_list\' table', () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(testItems);
        });
    });

    it('deleteItem() removes an item by id from \'shopping_list\' table', () => {
      const itemId = 3;
      return ShoppingListService.deleteItem(db, itemId)
        .then(() => ShoppingListService.getAllItems(db))
        .then(allItems => {
          const expected = testItems.filter(item => item.id !== itemId);
          expect(allItems).to.eql(expected);
        });
    });

    it('getById() resolves an item by id from \'shopping_list\' table', () => {
      const thirdId = 3;
      const thridTestItem = testItems[thirdId-1];
      return ShoppingListService.getById(db, thirdId)
        .then(actual => {
          expect(actual).to.eql({
            id: thirdId,
            name: thridTestItem.name,
            price: thridTestItem.price,
            category: thridTestItem.category,
            checked: thridTestItem.checked,
            date_added: thridTestItem.date_added
          });
        });
    });
    it(`updateItem() updates an item from the 'shopping_list' table`, () => {
      const idOfItemToUpdate = 3;
      const newItemData = {
        name: 'test item', 
        price: '3.33', 
        category: 'Breakfast', 
        checked: false, 
        date_added: new Date('2020-01-01T00:00:00.000Z')
      };

      return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
      .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
      .then(item => {
        expect(item).to.eql({
          id: idOfItemToUpdate,
          ...newItemData
        })
      })
    });
  });

  context('Given \'shopping_list\' has no data', () => {
    it('getAllItems) resolves an empty array', () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql([]);
        });
    });

    it('insertItem() inserts an item and resolves the item with \'id\'', () => {
      const newItem = {
        name: 'test item', 
        price: '3.33', 
        category: 'Breakfast', 
        checked: false, 
        date_added: new Date('2020-01-01T00:00:00.000Z')
      };
      return ShoppingListService.insertItem(db, newItem)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            name: newItem.name,
            price: newItem.price,
            category: newItem.category,
            checked: newItem.checked,
            date_added: newItem.date_added
          });
        });
    });
  });
});

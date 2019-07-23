require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

function getAllTextItems(searchTerm) {
  knexInstance('shopping_list')
    .select('*')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err.message))
    .finally(() => knexInstance.destroy());
}

function paginateItems(pageNumber) {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (pageNumber - 1);
  knexInstance('shopping_list')
    .select('*')
    .limit(itemsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err.message))
    .finally(() => knexInstance.destroy());
}

// paginateItems(3);

// getAllTextItems('fish');
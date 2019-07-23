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

function itemsAddedAfter(daysAgo) {
    knexInstance('shopping_list')
        .select('*')
        .where(
            'date_added',
            '>',
            knexInstance.raw('now() - \'?? days\'::INTERVAL', daysAgo)
        )
}

itemsAddedAfter(5);

// paginateItems(3);

// getAllTextItems('fish');
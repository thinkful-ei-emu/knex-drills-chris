const ArticlesService = {
  getAllArticles(knex){
    return knex.select('*').from('blogful_articles');
  },

  insertArticle(db, newArticle) {
    return db('blogful_articles')
      .insert(newArticle)
      .returning('*')
      .then(res => res[0]);
  },

  getById(db, id) {
    return db.from('blogful_articles').select('*').where('id', id).first();
  },

  deleteArticle(db, id) {
    return db('blogful_articles')
      .where({ id })
      .delete();
  },

  updateArticle(db, id, newArticleFields) {
    return db('blogful_articles')
      .where({ id })
      .update(newArticleFields);
  }
};

module.exports = ArticlesService;
const ArticlesService = require('../src/articles-service');
const knex = require('knex');

const testArticles = [
  {
    id: 1,
    date_published: new Date('2029-01-22T16:28:32.615Z'),
    title: 'First post',
    content: 'This is content'
  },
  {
    id: 2,
    date_published: new Date('2100-05-22T16:28:32.615Z'),
    title: 'Second post',
    content: 'This is content'
  },
  {
    id: 3,
    date_published: new Date('1919-12-22T16:28:32.615Z'),
    title: 'Third post',
    content: 'This is content'
  },
];

describe('Articles service object', function() {
  let db;

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  before(() => db('blogful_articles').truncate());

  afterEach(() => db('blogful_articles').truncate());

  after(() => db.destroy());
  
  context('Given \'blogful_articles\' has data', () => {
    beforeEach(() => {
      return db
        .into('blogful_articles')
        .insert(testArticles);
    });

    it('getAllArticles() resolves all articles from \'blogful_articles\' table', () => {
      return ArticlesService.getAllArticles(db)
        .then(actual => {
          expect(actual).to.eql(testArticles);
        });
    });

    it('getById() resolves an article by id fromr \'blogful_articles\' table', () => {
      const thirdId = 3;
      const thridTestArticle = testArticles[thirdId-1];
      return ArticlesService.getById(db, thirdId)
        .then(actual => {
          expect(actual).to.eql({
            id: thirdId,
            title: thridTestArticle.title,
            content: thridTestArticle.content,
            date_published: thridTestArticle.date_published
          });
        });
    });
    it(`deleteArticle() removes an article by id from 'blogful_articles' table`, () => {
      const articleId = 3;
      return ArticlesService.deleteArticle(db, articleId)
        .then(() => ArticlesService.getAllArticles(db))
        .then(allArticles => {
          //copy the test articles array without the "deleted" article
          const expected = testArticles.filter(article => article.id !== articleId);
          expect(allArticles).to.eql(expected);
        });
    });

    it(`updateArticle() updates an article from the 'blogful_articles' table`, () => {
        const idOfArticleToUpdate = 3;
        const newArticleData = {
            title: 'updated title',
            content: 'updated content',
            date_published: new Date(),
        };

        return ArticlesService.updateArticle(db, idOfArticleToUpdate, newArticleData)
        .then(() => ArticlesService.getById(db, idOfArticleToUpdate))
        .then(article => {
            expect(article).to.eql({
                id: idOfArticleToUpdate,
                ...newArticleData
            });
        });
    });
  });

  context('Given \'blogful_articles\' has no data', () => {
    it('getAllArticles() resolves an empty array', () => {
      return ArticlesService.getAllArticles(db)
        .then(actual => {
          expect(actual).to.eql([]);
        });
    });

    it('insertArticle() inserts an article and resolves the article with an \'id\'', () => {
      const newArticle = {
        title: 'Test new title',
        content: 'Test new content',
        date_published: new Date('2020-01-01T00:00:00.000Z')
      };
      return ArticlesService.insertArticle(db,newArticle)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            title: newArticle.title,
            content: newArticle.content,
            date_published: newArticle.date_published,
          });
        });
    });    
  });
});

//     it('returns empty array if no data exists', () => {
//       return ArticlesService.getAllArticles(db)
//         .then(articles => {
//           expect(articles).to.be.an('array');
//           expect(articles).to.have.lengthOf(0);
//         });
//     });

//     context('with data seeded', () => {
//       before(() => {
//         db('blogful_articles')
//           .insert(testArticles);
//       });
//     });

//     it('returns expected data', () => {
//       return ArticlesService.getAllArticles(db)
//         .then(articles => {
//           expect(articles).to.be.an('array');
//           expect(articles).to.have.lengthOf(2);
//           expect(articles[0]).tobe.an('object');
//           expect(articles[0]).to.have.all.keys('title', 'date_published', 'id');
//           expect(articles[0].title).to.eq('First post');
//           expect(articles[0].content).to.eq('This is content');
//         });
//     });
//   });

//   describe('insertArticles()', () => {
//     it('returns title not null error if no title', () => {
//       const invalidArticle = {
//         title: 'Blog 1'
//       };
//       return ArticlesService.insertArticle(db, invalidArticle)
//         .then(res => {
//           expect.fail();
//         })
//         .catch(err => {
//           expect(err.emssage).to.include('violates not-null');
//         });
//     });
//     it('returns created article', () => {
//       const validArticle = testArticles[0];

//       return ArticlesService.insertArticle(db, validArticle)
//         .then(res => {
//           console.log(res);
//           expect(res).to.be.an('object');
//           expect(res).to.include.all.keys('id', 'title', 'date_published');
//           expect(res.title).to.eq('First post');
//         });
//     });
//   });

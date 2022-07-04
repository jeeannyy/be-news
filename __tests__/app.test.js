const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db");
const request = require("supertest");
const app = require("../app");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});


describe('News app', () => {
   describe('3.Get/api/topics', () => {
    it('200: return all topics', () => {
      return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body: { topics } }) => {
        topics.forEach((topic) => {
          expect(topic).toHaveProperty("description");
          expect(topic).toHaveProperty("slug");
        });
      });
   }); 
});

   describe("Sad paths :( ", () => {
    it("404 for invalid paths", () => {
      return request(app)
        .get("/api/topicss")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid Path");
        });
    });
  });



  describe("4. GET /api/articles/:article_id", () => {
    it("check the properties of an article object", () => {
      let ARTICLE_ID = 2;
      return request(app)
        .get(`/api/articles/${ARTICLE_ID}`)
        .expect(200)
        .then(({body:{ article }}) => {
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("body");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
        });
    });

    // it("400: bad request response for invalid path", () => {
    //     return request(app)
    //     .get(`/api/articles/potato`)
    //     .expect(400)
    //     .then(({ body: { msg } }) => {
    //         expect(msg).toBe("Invalid path");
    //     });
    // });
  });






});
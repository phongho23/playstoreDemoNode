const app = require('../app');
const expect = require('chai').expect;
const supertest = require('supertest');

describe("Playstore /apps endpoint", () => {
    it('should return an array of the apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf.at.least(1);
                const app = res.body[0];
                expect(app).to.include.all.keys('Rating', 'Genres', 'App')
            })
    });

    it('should sort only by rating or app', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'MISTAKE'})
            .expect(400, 'Sort must be one of rating or app')
    });



    it('should sort by rating on app', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'rating' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let sorted = true;

                let i = 0;
                while(i < res.body.length - 1) {
                    const appRes1 = res.body[i];
                    const appRes2 = res.body[i + 1]
                    if (appRes1.Rating > appRes2.Rating){
                        sorted = false;
                        break;
                    }
                    i++;
                }
                expect(sorted).to.be.true;
            });
    });

    it('should sort by name of the App', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'app' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let sorted = true;

                let i = 0;
                while (i < res.body.length - 1) {
                    const appRes1 = res.body[i];
                    const appRes2 = res.body[i + 1];
                    if (appRes1.App < appRes2.App) {
                        sorted = false;
                        break;
                    }
                    i++;
                }
                expect(sorted).to.be.true;
            });
    });


    it('should sort by genres', () => {
        const expected = [
            {
                "App": "Helix Jump",
                "Category": "GAME",
                "Rating": 4.2,
                "Reviews": "1497361",
                "Size": "33M",
                "Installs": "100,000,000+",
                "Type": "Free",
                "Price": "0",
                "Content Rating": "Everyone",
                "Genres": "Action",
                "Last Updated": "April 9, 2018",
                "Current Ver": "1.0.6",
                "Android Ver": "4.1 and up"
            },
            {
                "App": "Kick the Buddy",
                "Category": "GAME",
                "Rating": 4.3,
                "Reviews": "1000417",
                "Size": "Varies with device",
                "Installs": "50,000,000+",
                "Type": "Free",
                "Price": "0",
                "Content Rating": "Teen",
                "Genres": "Action",
                "Last Updated": "July 5, 2018",
                "Current Ver": "Varies with device",
                "Android Ver": "4.4 and up"
            },
            {
                "App": "slither.io",
                "Category": "GAME",
                "Rating": 4.4,
                "Reviews": "5234162",
                "Size": "Varies with device",
                "Installs": "100,000,000+",
                "Type": "Free",
                "Price": "0",
                "Content Rating": "Everyone",
                "Genres": "Action",
                "Last Updated": "November 14, 2017",
                "Current Ver": "Varies with device",
                "Android Ver": "2.3 and up"
            },
            {
                "App": "Temple Run 2",
                "Category": "GAME",
                "Rating": 4.3,
                "Reviews": "8118609",
                "Size": "62M",
                "Installs": "500,000,000+",
                "Type": "Free",
                "Price": "0",
                "Content Rating": "Everyone",
                "Genres": "Action",
                "Last Updated": "July 5, 2018",
                "Current Ver": "1.49.1",
                "Android Ver": "4.0 and up"
            },
            {
                "App": "Zombie Hunter King",
                "Category": "GAME",
                "Rating": 4.3,
                "Reviews": "10306",
                "Size": "50M",
                "Installs": "1,000,000+",
                "Type": "Free",
                "Price": "0",
                "Content Rating": "Mature 17+",
                "Genres": "Action",
                "Last Updated": "August 1, 2018",
                "Current Ver": "1.0.8",
                "Android Ver": "2.3 and up"
            }
        ]
        return supertest(app)
            .get('/apps')
            .query({ genres: 'Action' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).eql(expected)
            });
    });







});





// describe('GET /books', () => {
//     it('should return an array of books', () => {
//         return supertest(app)
//             .get('/books')
//             .expect(200)
//             .expect('Content-Type', /json/)
//             .then(res => {
//                 expect(res.body).to.be.an('array');
//                 expect(res.body).to.have.lengthOf.at.least(1);
//                 const book = res.body[0];
//                 expect(book).to.include.all.keys(
//                     'bestsellers_date', 'author', 'description', 'title'
//                 );
//             });
//     })
// This API always returns HTTP 200; the real status is in the "responseCode" field of the body.
describe('Products API', () => {
  it('GET /productsList returns all products', () => {
    cy.apiRequest('GET', '/productsList').then((data) => {
      expect(data.responseCode).to.eq(200);
      expect(data.products).to.have.length.greaterThan(0);
      data.products.forEach((product) => {
        expect(product).to.include.all.keys('id', 'name', 'price', 'brand', 'category');
        expect(product.id).to.be.a('number');
        expect(product.price).to.match(/^Rs\. \d+$/);
        expect(product.category.category).to.be.a('string');
      });
    });
  });

  it('POST /productsList is not supported', () => {
    cy.apiRequest('POST', '/productsList').then((data) => {
      expect(data.responseCode).to.eq(405);
      expect(data.message).to.eq('This request method is not supported.');
    });
  });

  it('GET /brandsList returns brands', () => {
    cy.apiRequest('GET', '/brandsList').then((data) => {
      expect(data.responseCode).to.eq(200);
      expect(data.brands).to.have.length.greaterThan(0);
      expect(data.brands[0]).to.have.all.keys('id', 'brand');
    });
  });

  it('POST /searchProduct finds matching products', () => {
    cy.apiRequest('POST', '/searchProduct', { search_product: 'top' }).then((data) => {
      expect(data.responseCode).to.eq(200);
      expect(data.products).to.have.length.greaterThan(0);
      data.products.forEach((product) => {
        expect(`${product.name} ${product.category.category}`.toLowerCase()).to.contain('top');
      });
    });
  });

  it('POST /searchProduct without parameter returns 400', () => {
    cy.apiRequest('POST', '/searchProduct').then((data) => {
      expect(data.responseCode).to.eq(400);
      expect(data.message).to.eq('Bad request, search_product parameter is missing in POST request.');
    });
  });
});

describe('Account API', () => {
  it('POST /verifyLogin with unknown user returns 404', () => {
    cy.apiRequest('POST', '/verifyLogin', { email: 'no-such-user@example.com', password: 'wrong' }).then((data) => {
      expect(data.responseCode).to.eq(404);
      expect(data.message).to.eq('User not found!');
    });
  });

  it('POST /verifyLogin without email returns 400', () => {
    cy.apiRequest('POST', '/verifyLogin', { password: 'wrong' }).then((data) => {
      expect(data.responseCode).to.eq(400);
      expect(data.message).to.eq('Bad request, email or password parameter is missing in POST request.');
    });
  });

  it('DELETE /verifyLogin is not supported', () => {
    cy.apiRequest('DELETE', '/verifyLogin').then((data) => {
      expect(data.responseCode).to.eq(405);
      expect(data.message).to.eq('This request method is not supported.');
    });
  });
});

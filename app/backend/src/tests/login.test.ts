import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const UserMock = {
  "username": "Admin",
  "role": "admin",
  "email": "admin@admin.com",
  "password": "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

describe('Teste do Login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  it('testando a rota de login', async() => {
    sinon.stub(Users, 'findOne').resolves(UserMock as Users);

    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('testando a rota de login sem email', async() => {

    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      "password": "secret_admin"
    });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "All fields must be filled" });
  });

  it('testando a rota de login usuario invalido', async() => {
    sinon.stub(Users, 'findOne').resolves();

    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      "email": "admin@admin.com",
      "password": "erradonoenvio"
    });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  });

});

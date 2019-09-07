const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

const urlBase = 'https://accounts.spotify.com';

describe('Spotify Api Testing', () => {
  describe('Authentication', () => {
    it('Auth Spotify', async () => {
      const requestBody = {
        grant_type: 'client_credentials'
      };

      const header = `Basic ${process.env.CLIENT_ID_CLIENT_SECRET}`;

      const response = await agent.post(`${urlBase}/api/token`).set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', header).send(requestBody);

      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.token_type).to.equal('Bearer');
      expect(response.body).to.have.property('access_token');
    });
  });
});

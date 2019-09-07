const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

const urlBase = 'https://accounts.spotify.com';
const urlBase2 = 'https://api.spotify.com';

let token = '';

describe('Spotify Api Testing', () => {
  describe('Authentication', () => {
    it('Auth Spotify', async () => {
      const requestBody = {
        grant_type: 'client_credentials'
      };

      const header = `Basic ${process.env.CLIENT_ID_CLIENT_SECRET}`;

      const response = await agent.post(`${urlBase}/api/token`).set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', header).send(requestBody);

      token = response.body.access_token;

      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.token_type).to.equal('Bearer');
      expect(response.body).to.have.property('access_token');
    });
  });

  describe('Spotify search', () => {
    it('Song search', async () => {
      const query = {
        q: 'Till I Collapse',
        type: 'track',
        limit: 20
      };

      const header = `Bearer ${token}`;

      const response = await agent.get(`${urlBase2}/v1/search`).set('Authorization', header).query(query);

      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.tracks.items).lengthOf(20);
    });
  });
});

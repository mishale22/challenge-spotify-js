const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

const accountUrl = 'https://accounts.spotify.com';
const apiUrl = 'https://api.spotify.com';

let token = '';

describe('Spotify Api Testing', () => {
  describe('Authentication', () => {
    it('Auth Spotify', async () => {
      const requestBody = {
        grant_type: 'client_credentials'
      };

      const header = `Basic ${process.env.CLIENT_ID_CLIENT_SECRET}`;

      const response = await agent.post(`${accountUrl}/api/token`)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', header)
        .send(requestBody);

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

      const authHeader = `Bearer ${token}`;

      const response = await agent.get(`${apiUrl}/v1/search`)
        .set('Authorization', authHeader)
        .query(query);

      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.tracks.items).lengthOf(20);
    });
  });
});

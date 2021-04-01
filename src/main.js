const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5000";

function isValid({ id, name, meaning, quadrant, starsWithPlanets }) {
  return id && name && meaning && quadrant && starsWithPlanets;
}

function update(constellation) {
  return axios
    .put(`${BASE_URL}/constellations/${constellation.id}`, constellation);
}

function bulkImport(constellations) {
  if (!Array.isArray(constellations)) {
    return Promise.reject({ error: 'Inputted argument must be an array.' })
  }
  if (!constellations.every(constellation => isValid(constellation))) {
    return Promise.reject({ error: 'All constellations must be valid.' })
  }

  const promises = constellations.map(constellation => {
    return axios
      .put(`${BASE_URL}/constellations/${constellation.id}`, constellation);
  })
  
  return Promise.allSettled(promises);
}

module.exports = { bulkImport, update };

module.exports = {
  getBills: () => {
    return fetch('/api/bills')
        .then(response => response.json());
  },
};
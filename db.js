const trackingDB = {
  "EXP123": { status: "In Transit", location: "New York" },
  "EXP456": { status: "Delivered", location: "Los Angeles" },
};

const subscribers = [];

module.exports = {
  getTracking: async (number) => trackingDB[number],
  addSubscriber: async (email) => subscribers.push(email),
};

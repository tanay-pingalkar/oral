function beforeEveryone() {
  return "this is before everyone";
}

module.exports = {
  testDir: "/example/tests",
  beforeEveryone: beforeEveryone,
};

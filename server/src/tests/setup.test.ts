beforeAll(() => {
  process.env.SERVER_ENV = "TESTING";
});

test("jest", () => {
  expect(typeof "jest").toMatch("string");
});

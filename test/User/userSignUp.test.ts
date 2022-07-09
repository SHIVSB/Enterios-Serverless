import { User } from "../../src/models/user.model";
import httpTrigger from "../../signUp";
import { Context } from "@azure/functions";

test("first jest test", () => {
  const sum = 1 + 2;
  expect(sum).toBe(3);
});

let context: Context;

beforeEach(() => {
  context = { log: jest.fn() } as unknown as Context;
});

afterEach(() => {
  jest.useRealTimers();
});

test("should check the user sign up method", async () => {
  jest.useFakeTimers();
  const request = {
    body: {
      firstName: "test",
      lastName: "test",
      email: "test@game.com",
      password: "test",
    },
  };

  await httpTrigger(context, request);

  expect(context.res.status).toEqual(200);
});

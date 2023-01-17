import { window } from "../src/index";

test("new window 对象报错", () => {
  expect(() => {
    throw new window();
  }).toThrow("window is not a constructor");
});

test("window 原型链路", () => {
  expect(window.__proto__.constructor.name).toMatch("Window");
  expect(window.__proto__.__proto__.constructor.name).toMatch("EventTarget");
  expect(window.__proto__.__proto__.toString()).toMatch(
    "[object WindowProperties]"
  );
});

test("window localStorage",()=>{
  console.log(window.localStorage);
  console.log(window.localStorage.getItem);
})
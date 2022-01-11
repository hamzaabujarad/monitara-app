import { AppthemeModel } from "./apptheme"

test("can be created", () => {
  const instance = AppthemeModel.create({})

  expect(instance).toBeTruthy()
})

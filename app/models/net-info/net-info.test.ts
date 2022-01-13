import { NetInfoModel } from "./net-info"

test("can be created", () => {
  const instance = NetInfoModel.create({})

  expect(instance).toBeTruthy()
})

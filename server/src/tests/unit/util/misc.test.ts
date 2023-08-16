import { GeneralUtil } from "../../../util/misc.util";

describe("Misc Methods", () => {
  test("if class would instantiate the same class", () => {
    expect(GeneralUtil.getInst()).toStrictEqual(GeneralUtil.getInst());
  });

  test("if sample object key + subkeys and transfomed object keys would be equal", () => {
    const sampleObj = {
      key1: {
        key11: 11,
        key12: 12,
      },
      key2: {
        key21: 21,
        key22: 22,
      },
      key3: 3,
    };

    function countObjectProp(obj: any): number {
      let prop: number = 0;

      for (let key in obj) {
        if (typeof obj[key] === "object") {
          for (let subKey in obj[key]) {
            prop++;
          }
        } else {
          prop++;
        }
      }
      return prop;
    }

    expect(Object.keys(GeneralUtil.flattenObject(sampleObj)).length).toEqual(
      countObjectProp(sampleObj)
    );
  });
});

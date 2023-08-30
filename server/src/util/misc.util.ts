export class GeneralUtil {
  private static inst: GeneralUtil;

  private constructor() {}

  static flattenObject = (obj: any): any => {
    // EDIT
    obj._id !== null ? delete obj._id : null;
    obj.__v !== null ? delete obj.__v : null;

    let newObj: any = {};
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        for (let subKey in obj[key]) {
          newObj[subKey] = obj[key][subKey];
        }
      } else {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  };

  static readonly getMongoSkipLimit = (skip: number, skipCnt: number) => {
    return {
      skip: skip ? skip * skipCnt : 0,
      limit: (skip + 1) * skipCnt,
    };
  };

  static readonly getRedisSkipLimit = (skip: number, skipCnt: number) => {
    return {
      skip: skip ? skip * skipCnt : 0,
      limit: (skip + 1) * skipCnt - 1,
    };
  };

  static readonly getInst = () => {
    if (!this.inst) this.inst = new GeneralUtil();
    return this.inst;
  };
}

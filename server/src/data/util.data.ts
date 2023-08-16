import { Model } from "mongoose";

export class Utility {
  protected async createDBData(
    model: Model<any>,
    new_obj: any
  ): Promise<Error | null> {
    let doc: any;
    try {
      doc = await model.create(new_obj);
      return null;
    } catch (err) {
      return err as Error;
    }
  }
}

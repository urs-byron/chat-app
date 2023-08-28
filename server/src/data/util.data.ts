import { Model } from "mongoose";

export class Utility {
  /**
   *  This function shortens required document creation syntax.
   *
   * @param { Model<any> } model
   * @param { any } new_obj
   * @returns { Promise<Error | null> }
   *
   * @protected
   */
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

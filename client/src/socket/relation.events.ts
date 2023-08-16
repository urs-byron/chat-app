export class RelationEvent {
  private static inst: RelationEvent;

  static readonly patchRelation = () => {};

  static readonly getInst = (): RelationEvent => {
    if (!this.inst) this.inst = new RelationEvent();
    return this.inst;
  };
}

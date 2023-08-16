// export abstract class generic
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  // --- class variables declaration
  protected wrapperElement: T;
  protected templateElement: HTMLTemplateElement;
  protected insertedElement: U;

  // --- constructor parameters
  constructor(
    wrapperClass: string,
    templateId: string,
    insertedPosition: string,
    insertedId?: string
  ) {
    // --- --- class variables as HTML
    this.wrapperElement = document.querySelector(wrapperClass)! as T;
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;

    // --- --- --- newNode as import child copy of template
    this.insertedElement = document.importNode(
      this.templateElement.content,
      true
    ).firstElementChild as U;

    // --- --- newNode set id
    if (insertedId) this.insertedElement.setAttribute("id", insertedId);

    // --- --- attach call
    this.attachElement(insertedPosition);
  }

  attachElement(position: string) {
    this.wrapperElement.insertAdjacentElement(
      position as InsertPosition,
      this.insertedElement
    );
  }
  // --- abstract methods
  abstract renderComponent(...args: any[]): void;
  abstract configureComponent(...args: any[]): void;
}

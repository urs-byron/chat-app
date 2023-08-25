export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  protected wrapperElement: T;
  protected templateElement: HTMLTemplateElement;
  protected insertedElement: U;

  /**
   * This constructor, upon instantiating, attaches a temlate HTML element within wrapper element
   *
   * @param {string} wrapperClass - class of the soon container of the template element
   * @param {string} templateId - id of the template element
   * @param {string} insertedPosition - position within the wrapperElement where the template will be inserted
   * @param {string} [insertedId] - assigns id to the insertedElement if not null | undefined
   *
   * @constructor
   * @abstract
   */
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

  /**
   * This function inserts the template element within the wrapper element depending on the position.
   * @param {string} position
   */
  attachElement(position: string) {
    this.wrapperElement.insertAdjacentElement(
      position as InsertPosition,
      this.insertedElement
    );
  }

  /** This function configures class related variables and event listeners. */
  abstract configureComponent(...args: any[]): void;

  /** This function configures initial elements and styling configuration. */
  abstract renderComponent(...args: any[]): void;
}

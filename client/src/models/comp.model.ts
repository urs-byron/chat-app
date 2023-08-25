export interface iCompFunctions {
  /**
   * This function configures class related variables and event listeners.
   *
   * @param { any[] } [args]
   * @abstract
   */
  configureComponent: (...args: any[]) => void | Promise<void>;

  /**
   * This function configures initial elements and styling configuration.
   *
   * @param { any[] } [args]
   * @abstract
   */
  renderComponent: (...args: any[]) => void | Promise<void>;
}

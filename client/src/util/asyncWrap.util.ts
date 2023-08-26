/**
 * This function is an asynchronous wrapper for HTTP requesting functions which returns a transformed HTTP response object for error management.
 *
 * @param { Function } fx - an asynchronous function
 * @param { any[] } [params] - optional parameter(s)
 *
 * @returns { Promise<{ err: any; data: any }> }
 */
export async function tryCatch(
  fx: Function,
  ...params: any[]
): Promise<{ err: any; data: any }> {
  try {
    let data;

    if (params) {
      data = await fx(...params);
    } else {
      data = await fx();
    }

    if ((data.statusCode as number) >= 400) {
      return { err: data, data: null };
    } else {
      return { err: null, data };
    }
  } catch (err) {
    return { err, data: null };
  }
}

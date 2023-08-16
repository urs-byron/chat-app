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
    console.error(err);
    return { err, data: null };
  }
}

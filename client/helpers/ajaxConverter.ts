import _ from "lodash";

export interface AjaxData {
  [key: string]: unknown;
}

export function nestedToJsCase<T = AjaxData>(data: unknown | unknown[]): T {
  let returnValue: unknown = data;
  if (Array.isArray(data)) {
    returnValue = data.map(nestedToJsCase);
  } else if (typeof data === 'object' && data !== null) {
    returnValue = _.entries(data).reduce<AjaxData>((obj, [key, value]) => {
      const camelKey = _.camelCase(key);
      obj[camelKey] = nestedToJsCase(value);
      return obj;
    }, {});
  }

  return returnValue as T;
}

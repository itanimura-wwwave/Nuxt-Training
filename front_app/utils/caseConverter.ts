/* eslint-disable @typescript-eslint/no-explicit-any */

// 'snake_case' を 'camelCase' に変換する関数
const snakeToCamel = (str: string) =>
  str.replace(/(_\w)/g, (m) => m[1].toUpperCase())

// オブジェクトのキーを再帰的にキャメルケースに変換するメイン関数
export const keysToCamel = (obj: any): any => {
  // 配列の場合、各要素を再帰的に処理
  if (Array.isArray(obj)) {
    return obj.map((v) => keysToCamel(v))
  }

  // オブジェクトの場合、キーを変換し、値も再帰的に処理
  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => {
        result[snakeToCamel(key)] = keysToCamel(obj[key])
        return result
      },
      {} as { [key: string]: any }
    )
  }

  // それ以外（string, number, boolean, nullなど）はそのまま返す
  return obj
}

const camelToSnake = (str: string) => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

/**
 * オブジェクトのキーを再帰的にスネークケースに変換します。
 * @param obj 変換対象のオブジェクト
 * @returns キーがスネークケースに変換された新しいオブジェクト
 */
export const keysToSnake = (obj: any): any => {
  // 配列の場合、各要素を再帰的に処理
  if (Array.isArray(obj)) {
    return obj.map((v) => keysToSnake(v))
  }

  // オブジェクトの場合、キーを変換し、値も再帰的に処理
  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => {
        result[camelToSnake(key)] = keysToSnake(obj[key])
        return result
      },
      {} as { [key: string]: any }
    )
  }

  // それ以外（string, number, boolean, nullなど）はそのまま返す
  return obj
}

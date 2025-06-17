export interface IErrorResponse {
  detail: ErrorDetail[]
}

interface ErrorDetail {
  loc: [string, number]
  msg: string
  type: string
}

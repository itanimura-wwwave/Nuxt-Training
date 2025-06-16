import type { ICreateSynthesisRequest } from '~/core/voicevoxApiServer/requests/ICreateSynthesisRequest'
import type { ICreateSynthesisResponse } from '~/core/voicevoxApiServer/responses/ICreateSynthesisResponse'

export interface requestParams {
  requestBody: ICreateSynthesisRequest
  queryParams: {
    speaker: number
  }
}

export async function CreateSynthesisRequest(
  requestParams: requestParams
): Promise<ICreateSynthesisResponse> {
  const result: Blob = await $fetch(
    `http://localhost:50021/synthesis?speaker=${requestParams.queryParams.speaker}`,
    {
      method: 'POST',
      body: requestParams.requestBody,
      responseType: 'blob',
    }
  )
  return result
}

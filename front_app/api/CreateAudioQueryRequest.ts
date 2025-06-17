import type { ICreateAudioQueryRequest } from '~/core/voicevoxApiServer/requests/ICreateAudioQueryRequest'
import type { ICreateAudioQueryResponse } from '~/core/voicevoxApiServer/responses/ICreateAudioQueryResponse'

export interface requestParams {
  queryParams: ICreateAudioQueryRequest
}

export async function CreateAudioQueryRequest(
  requestParams: requestParams
): Promise<ICreateAudioQueryResponse> {
  const result: ICreateAudioQueryResponse = keysToCamel(
    await $fetch(
      `http://localhost:50021/audio_query?text=${requestParams.queryParams.text}&speaker=${requestParams.queryParams.speaker}`,
      { method: 'POST' }
    )
  )
  return result
}

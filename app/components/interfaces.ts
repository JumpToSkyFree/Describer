export type WaitingListUserInformations = {
  fullname: string;
  email: string;
} | null;

export interface ResponseStatus {
  success: boolean;
}

export interface FieldsResponseErrors<T = unknown> extends ResponseStatus {
  errors: Record<string, { codes: Array<string> }>;
  data: T;
}

export function isFieldsResponseErrors(
  response: JoinWaitingListServerContext
): response is FieldsResponseErrors<WaitingListUserInformations> {
  return response !== null && response && "errors" in response;
}

export type JoinWaitingListServerContext =
  | WaitingListUserInformations
  | FieldsResponseErrors<WaitingListUserInformations>;

export interface BaseAction<TType extends string, TPayload, TResponse = void> {
  type: TType;
  payload: TPayload;
  _response?: TResponse; 
}

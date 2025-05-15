type SuccessResult<Data> = {
  success: true;
  data: Data;
};

type FailureResult = {
  success: false;
  error: Error;
};

export type ActionResult<Data> = Promise<SuccessResult<Data> | FailureResult>;

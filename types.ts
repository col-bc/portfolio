export type ActionState<T> =
  | { success: true; data: T }
  | {
      success: false;
      error: string;
      type:
        'UNAUTHORIZED' | 'VALIDATION' | 'UNKNOWN' | 'NOT_FOUND' | 'RATE_LIMIT';
    };

export type Message = {
  id: string;
  role: 'assistant' | 'system' | 'user';
  parts: Array<
    { type: 'text'; text: string } | { type: 'data-timestamp'; data: string }
  >;
};

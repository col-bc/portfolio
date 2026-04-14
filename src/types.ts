export type ActionState<T> =
    | { success: true; data: T }
    | {
          success: false;
          error: string;
          type: "UNAUTHORIZED" | "VALIDATION" | "UNKNOWN" | "NOT_FOUND";
      };

export function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  if (typeof error !== "object") {
    return false;
  }

  const { errno, code, path, syscall } = error as NodeJS.ErrnoException;
  return (
    (errno === undefined || typeof errno === "number") &&
    (code === undefined || typeof code === "string") &&
    (path === undefined || typeof path === "string") &&
    (syscall === undefined || typeof syscall === "string")
  );
}

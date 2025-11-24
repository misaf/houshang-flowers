export const JSON_API_HEADERS = {
  "Content-Type": "application/vnd.api+json",
  Accept: "application/vnd.api+json",
} as const;

export function getNetworkErrorStatus(error: Error): number {
  const message = error.message.toLowerCase();

  if (
    message.includes("certificate") ||
    message.includes("ssl") ||
    message.includes("tls") ||
    message.includes("enotfound") ||
    message.includes("getaddrinfo") ||
    message.includes("econnrefused") ||
    message.includes("connection refused")
  ) {
    return 502;
  }

  return 500;
}

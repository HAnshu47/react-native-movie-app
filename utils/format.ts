export function formatRuntime(runtime?: number): string {
  if (!runtime) return "未知";
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  let result = "";
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m`;
  return result.trim();
}

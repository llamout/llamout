export function timeAgo(timestamp: number) {
  const now = Date.now();
  const diffMs = now - timestamp;
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return 'Now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} min`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hour${Math.floor(diffSec / 3600) > 1 ? 's' : ''}`;

  const days = Math.floor(diffSec / 86400);
  return `${days} day${days > 1 ? 's' : ''}`;
}

export function formatDate(timestamp: any) {
  const date = new Date(timestamp);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

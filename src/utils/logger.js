export const logEvent = (type, message, data = {}) => {
  const time = new Date().toISOString();
  const logEntry = {
    time,
    type: type.toUpperCase(),
    message,
    data,
  };

  console.log(`[${new Date(time).toLocaleString()}] [${logEntry.type}] ${message}`, data);

  const existing = JSON.parse(localStorage.getItem('appLogs') || '[]');
  const updated = [logEntry, ...existing.slice(0, 99)]; // Keep max 100 logs
  localStorage.setItem('appLogs', JSON.stringify(updated));
};

function formatDate(date) {
  const pad = (n) => n < 10 ? '0' + n : n;
  return `${date.toLocaleDateString().replace(/\s/g, '\xa0')}\xa0` +
         `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

export { formatDate };
const formatDate = (date) => {
  return `${date.toDateString().replace(/\s/g, '\xa0')}\xa0` +
         `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

export { formatDate };
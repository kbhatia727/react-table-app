export const calculateDSR = (registeredDate) => {
  const regDate = new Date(registeredDate);
  const diffTime = Date.now() - regDate.getTime();
  return Math.floor(diffTime / (1000 * 3600 * 24));
};

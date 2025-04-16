export const formatDate = (dateString: string) => {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

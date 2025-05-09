export const scrollIntoView = (elementId: string) => {
  const elementToScroll = document.getElementById(elementId);
  if (elementToScroll) {
    elementToScroll.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

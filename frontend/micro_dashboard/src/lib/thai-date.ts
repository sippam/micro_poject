export const convertThaiDate = (date: string | Date) => {
  const result = new Date(date).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  return result;
};

export const convertThaiDateNoTime = (date: string | Date) => {
  const result = new Date(date).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return result;
};

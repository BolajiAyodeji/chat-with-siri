export default function sortArray<T>(array: T[], order: "asc" | "desc") {
  return array.sort((a, b) => {
    if (order === "asc") {
      return a > b ? 1 : -1;
    } else {
      return a < b ? 1 : -1;
    }
  });
}

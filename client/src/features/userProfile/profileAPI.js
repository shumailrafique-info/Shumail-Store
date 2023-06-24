export function fetchCount(amount = 1) {
  return new Promise(async (resolve) => {
    const response = fetch("http://localhost:4000");
    const data = await response.json();
    resolve({ data });
  });
}

export async function getHttp(request: string): Promise<any> {
  try {
    const response = await fetch(request);
    const data = await response.json();
    return data;
  } catch {
    throw new Error("Что-то пошло не так");
  }
}

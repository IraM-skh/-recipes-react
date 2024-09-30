export async function getHttp(request: string): Promise<any> {
  try {
    const response = await fetch(request);
    const data = await response.json();
    return data;
  } catch {
    throw new Error("Что-то пошло не так");
  }
}

export async function postHttp(
  request: string,
  options: { method: string; headers: { "Content-Type": string }; body: string }
): Promise<any> {
  try {
    const response = await fetch(request, options);
    const data = await response.json();
    return data;
  } catch {
    throw new Error("Что-то пошло не так");
  }
}

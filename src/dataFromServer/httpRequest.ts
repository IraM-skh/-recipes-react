export async function getHttp(request: string): Promise<any> {
  const response = await fetch(request);
  const data = await response.json();
  return data;
}

// ginagamit upang i get ang data mula sa isang url gamit ang fetch api na sinasalin sa json format
export const fetcher = (url: string) => fetch(url).then((res) => res.json());

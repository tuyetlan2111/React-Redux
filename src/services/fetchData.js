export async function fetchListname() {
  return fetch(`http://localhost:3000/listname`)
    .then(response => response)
    .then(response => response.json());
};

export async function fetchProduct() {
  return await fetch(`http://localhost:3000/products`)
    .then(response => response)
    .then(response => response.json());
};

export async function fetchSearchData(key) {
  return await fetch(`http://localhost:3000/products?q=${key}`)
    .then(response => response)
    .then(response => response.json());
}

export async function fetchGetUser() {
  return await fetch('http://localhost:3000/user')
    .then(response => response)
    .then(response => response.json())
}

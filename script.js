const palavrasChave = [
  "romance",
  "ficcao",
  "aventura",
  "fantasia",
  "mistério",
  "tecnologia",
  "thriller",
];

const getBooks = async () => {
  const palavra =
    palavrasChave[Math.floor(Math.random() * palavrasChave.length)];
  const startIndex = Math.floor(Math.random() * 40);

  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${palavra}&maxResults=4&startIndex=${startIndex}`
  );
  const dados = await res.json();

  const livros =
    dados.items?.map((l) => ({
      titulo: l.volumeInfo.title,
      autor: l.volumeInfo.authors?.[0] || "Autor desconhecido",
      capa: l.volumeInfo.imageLinks?.thumbnail,
    })) || [];

  document.getElementById("booksGrid").innerHTML = livros
    .map(
      (l) =>
        `<div class="book-card">
       <div class="book-cover">
         <img src="${
           l.capa || "https://via.placeholder.com/80x120?text=Sem+Capa"
         }" alt="${l.titulo}">
       </div>
       <div class="book-title">${l.titulo}</div>
       <div class="book-author">${l.autor}</div>
     </div>`
    )
    .join("");
};

document.getElementById("recommendBtn").addEventListener("click", getBooks);

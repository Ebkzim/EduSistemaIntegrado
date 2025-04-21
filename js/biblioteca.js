
document.addEventListener('DOMContentLoaded', function() {
  
  loadBooks();
  setupEventListeners();
  checkUserStatus();
});


function checkUserStatus() {
  const username = sessionStorage.getItem('username');
  const userDisplayElements = document.querySelectorAll('.user-display');
  
  if (username) {
    userDisplayElements.forEach(element => {
      element.textContent = username;
    });
    
    
    document.getElementById('borrowed-books-section').style.display = 'block';
    loadBorrowedBooks();
  }
}


const books = [
  {
    id: 1,
    title: 'O Senhor dos Anéis',
    author: 'J.R.R. Tolkien',
    isbn: '9788533613379',
    genre: 'Fantasia',
    year: 1954,
    pages: 1200,
    available: true,
    cover: 'https://harpercollins.com.br/cdn/shop/products/9786555114249.jpg?v=1691738136',
    description: 'Em uma terra fantástica e única, um hobbit recebe de presente de seu tio um anel mágico e perigoso que precisa ser destruído antes que caia nas mãos do mal.'
  },
  {
    id: 2,
    title: 'Harry Potter e a Pedra Filosofal',
    author: 'J.K. Rowling',
    isbn: '9788532511010',
    genre: 'Fantasia',
    year: 1997,
    pages: 264,
    available: true,
    cover: 'https://m.media-amazon.com/images/I/81ibfYk4qmL._SY466_.jpg',
    description: 'Harry Potter nunca tinha ouvido falar em Hogwarts até o momento em que as cartas começam a aparecer. Endereçadas com um capricho desnorteante, são rapidamente confiscadas por seus tios terríveis.'
  },
  {
    id: 3,
    title: 'Dom Quixote',
    author: 'Miguel de Cervantes',
    isbn: '9788573261080',
    genre: 'Clássico',
    year: 1605,
    pages: 863,
    available: false,
    cover: 'https://www.lpm.com.br/livros/imagens/dom_quixote_hq_9788525433633_hd.jpg',
    description: 'Dom Quixote conta as aventuras de um senhor de meia-idade que, deslumbrado pelas leituras sobre cavaleiros andantes, abandona sua fazenda e sai pelo mundo para combater gigantes e ajudar os indefesos.'
  },
  {
    id: 4,
    title: 'O Pequeno Príncipe',
    author: 'Antoine de Saint-Exupéry',
    isbn: '9788574750200',
    genre: 'Infantil',
    year: 1943,
    pages: 96,
    available: true,
    cover: 'https://m.media-amazon.com/images/I/61ATa0Pc4AL._AC_UF1000,1000_QL80_.jpg',
    description: 'Nesta história, um piloto de avião conhece um menino que vem de um asteroide distante. A narrativa aborda temas sobre a vida, amor e amizade.'
  },
  {
    id: 5,
    title: 'A Revolução dos Bichos',
    author: 'George Orwell',
    isbn: '9788535909555',
    genre: 'Ficção',
    year: 1945,
    pages: 152,
    available: true,
    cover: 'https://m.media-amazon.com/images/I/91BsZhxCRjL.jpg',
    description: 'Verdadeiro clássico moderno, concebido por um dos mais influentes escritores do século XX, A revolução dos bichos é uma fábula sobre o poder.'
  },
  {
    id: 6,
    title: 'Sapiens: Uma Breve História da Humanidade',
    author: 'Yuval Noah Harari',
    isbn: '9788525432186',
    genre: 'Não-Ficção',
    year: 2011,
    pages: 464,
    available: false,
    cover: 'https://cdl-static.s3-sa-east-1.amazonaws.com/covers/gg/9786559212996/sapiens-edicao-em-quadrinhos-os-pilares-da-civilizacao.jpg',
    description: 'O historiador Yuval Noah Harari traça uma breve história da humanidade, desde o surgimento do Homo sapiens até questões contemporâneas.'
  },
  {
    id: 7,
    title: 'Cem Anos de Solidão',
    author: 'Gabriel García Márquez',
    isbn: '9788501005823',
    genre: 'Realismo Mágico',
    year: 1967,
    pages: 448,
    available: true,
    cover: 'https://m.media-amazon.com/images/I/81SQPrWU7SL._AC_UF1000,1000_QL80_.jpg',
    description: 'Cem Anos de Solidão conta a história dos Buendía ao longo de várias gerações, em uma narrativa que mistura fantasia e realidade.'
  },
  {
    id: 8,
    title: 'Crime e Castigo',
    author: 'Fiódor Dostoiévski',
    isbn: '9788573262865',
    genre: 'Clássico',
    year: 1866,
    pages: 561,
    available: false,
    cover: 'https://m.media-amazon.com/images/I/916WkSH4cGL.jpg',
    description: 'Um dos maiores romances de todos os tempos, uma reflexão sobre o crime, a consciência e as consequências das nossas escolhas.'
  },
  {
    id: 9,
    title: 'A Metamorfose',
    author: 'Franz Kafka',
    isbn: '9788535902112',
    genre: 'Ficção',
    year: 1915,
    pages: 104,
    available: true,
    cover: 'https://m.media-amazon.com/images/I/71QLwli7GUL.jpg',
    description: 'Ao acordar após uma noite mal dormida, Gregor Samsa, um caixeiro-viajante, encontra-se metamorfoseado num inseto monstruoso.'
  },
  {
    id: 10,
    title: 'Orgulho e Preconceito',
    author: 'Jane Austen',
    isbn: '9788544001868',
    genre: 'Romance',
    year: 1813,
    pages: 424,
    available: true,
    cover: 'https://m.media-amazon.com/images/I/719esIW3D7L.jpg',
    description: 'Obra clássica de Jane Austen que explora temas como casamento, moralidade e educação através da história de Elizabeth Bennet e Sr. Darcy.'
  },
  {
    id: 11,
    title: 'O Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '9788595084742',
    genre: 'Fantasia',
    year: 1937,
    pages: 336,
    available: true,
    cover: 'https://m.media-amazon.com/images/I/91M9xPIf10L.jpg',
    description: 'Bilbo Bolseiro vive uma vida pacata no Condado, até o dia em que o mago Gandalf bate à sua porta e o leva a uma aventura extraordinária.'
  },
  {
    id: 12,
    title: '1984',
    author: 'George Orwell',
    isbn: '9788535914849',
    genre: 'Ficção Distópica',
    year: 1949,
    pages: 336,
    available: false,
    cover: 'https://m.media-amazon.com/images/I/819js3EQwbL._SY466_.jpg',
    description: 'Um clássico moderno distópico sobre um futuro totalitário onde o governo controla cada aspecto da vida dos cidadãos.'
  }
];


const borrowedBooks = [];


function loadBooks() {
  const booksListElement = document.getElementById('books-list');
  booksListElement.innerHTML = '';

  books.forEach(book => {
    const bookElement = createBookElement(book);
    booksListElement.appendChild(bookElement);
  });
}


function createBookElement(book) {
  const bookElement = document.createElement('div');
  bookElement.className = 'book-card';
  bookElement.dataset.id = book.id;

  const statusClass = book.available ? 'available' : 'borrowed';
  const statusText = book.available ? 'Disponível' : 'Emprestado';

  bookElement.innerHTML = `
    <div class="book-cover-wrapper">
      <img src="${book.cover}" alt="${book.title}" class="book-cover">
      <div class="book-status ${statusClass}">${statusText}</div>
    </div>
    <div class="book-details">
      <h3 class="book-title">${book.title}</h3>
      <p class="book-author">${book.author}</p>
      <span class="book-genre">${book.genre}</span>
    </div>
  `;

  bookElement.addEventListener('click', () => showBookDetails(book));

  return bookElement;
}


function showBookDetails(book) {
  const modal = document.getElementById('book-modal');
  
  
  document.getElementById('modal-book-title').textContent = book.title;
  document.getElementById('modal-book-author').textContent = book.author;
  document.getElementById('modal-book-isbn').textContent = book.isbn;
  document.getElementById('modal-book-genre').textContent = book.genre;
  document.getElementById('modal-book-year').textContent = book.year;
  document.getElementById('modal-book-pages').textContent = book.pages;
  document.getElementById('modal-book-description').textContent = book.description;
  document.getElementById('modal-book-cover').src = book.cover;
  
  
  const statusElement = document.getElementById('modal-book-status');
  statusElement.className = 'book-status';
  if (book.available) {
    statusElement.classList.add('available');
    statusElement.textContent = 'Disponível';
  } else {
    statusElement.classList.add('borrowed');
    statusElement.textContent = 'Emprestado';
  }
  
  
  const borrowButton = document.getElementById('borrow-button');
  const reserveButton = document.getElementById('reserve-button');
  const returnButton = document.getElementById('return-button');
  const renewButton = document.getElementById('renew-button');
  
  
  borrowButton.style.display = 'none';
  reserveButton.style.display = 'none';
  returnButton.style.display = 'none';
  renewButton.style.display = 'none';

  
  const isLoggedIn = sessionStorage.getItem('username') !== null;
  
  
  if (isLoggedIn) {
    
    const isBorrowedByUser = borrowedBooks.some(b => b.id === book.id);
    
    if (isBorrowedByUser) {
      
      returnButton.style.display = 'block';
      renewButton.style.display = 'block';
    } else if (book.available) {
      
      borrowButton.style.display = 'block';
    } else {
      
      reserveButton.style.display = 'block';
    }
  } else {
    
    if (book.available) {
      borrowButton.style.display = 'block';
    } else {
      reserveButton.style.display = 'block';
    }
  }
  
  
  borrowButton.dataset.bookId = book.id;
  reserveButton.dataset.bookId = book.id;
  returnButton.dataset.bookId = book.id;
  renewButton.dataset.bookId = book.id;
  
  
  modal.style.display = 'flex';
}


function loadBorrowedBooks() {
  const borrowedBooksElement = document.getElementById('borrowed-books-list');
  borrowedBooksElement.innerHTML = '';

  if (borrowedBooks.length === 0) {
    borrowedBooksElement.innerHTML = '<p>Você não possui livros emprestados no momento.</p>';
    return;
  }

  borrowedBooks.forEach(book => {
    const borrowedBookElement = document.createElement('div');
    borrowedBookElement.className = 'borrowed-book';
    
    
    const borrowDate = new Date();
    borrowDate.setDate(borrowDate.getDate() - Math.floor(Math.random() * 20));
    
    const returnDate = new Date(borrowDate);
    returnDate.setDate(returnDate.getDate() + 14);
    
    const today = new Date();
    const isLate = today > returnDate;
    const statusClass = isLate ? 'late' : 'on-time';
    
    borrowedBookElement.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" class="borrowed-book-cover">
      <div class="borrowed-book-info">
        <h3 class="borrowed-book-title">${book.title}</h3>
        <p class="borrowed-book-author">${book.author}</p>
        <div class="borrowed-book-dates">
          <div class="borrowed-date">
            <span>Emprestado em:</span> ${formatDate(borrowDate)}
          </div>
          <div class="return-date ${statusClass}">
            <span>Devolução até:</span> ${formatDate(returnDate)}
          </div>
        </div>
      </div>
    `;
    
    borrowedBookElement.addEventListener('click', () => showBookDetails(book));
    borrowedBooksElement.appendChild(borrowedBookElement);
  });
}


function formatDate(date) {
  return date.toLocaleDateString('pt-BR');
}


function setupEventListeners() {
  
  setupModalClose('book-modal', 'close-button');
  setupModalClose('message-modal', 'close-message-button');
  setupModalClose('login-modal', 'close-login-button');
  
  
  document.getElementById('search-button').addEventListener('click', searchBooks);
  document.getElementById('search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      searchBooks();
    }
  });
  
  
  document.getElementById('filter-availability').addEventListener('change', filterBooks);
  document.getElementById('filter-genre').addEventListener('change', filterBooks);
  
  
  document.getElementById('borrow-button').addEventListener('click', borrowBook);
  document.getElementById('reserve-button').addEventListener('click', reserveBook);
  document.getElementById('return-button').addEventListener('click', returnBook);
  document.getElementById('renew-button').addEventListener('click', renewBook);
  
  
  document.getElementById('message-button').addEventListener('click', function() {
    document.getElementById('message-modal').style.display = 'none';
  });
  
  
  document.getElementById('modal-login-button').addEventListener('click', function() {
    const username = document.getElementById('modal-username').value;
    if (username.trim() === '') {
      showMessage('Erro de Login', 'Por favor, digite um nome de usuário.');
      return;
    }
    
    
    sessionStorage.setItem('username', username);
    document.getElementById('login-modal').style.display = 'none';
    
    
    const userDisplayElements = document.querySelectorAll('.user-display');
    userDisplayElements.forEach(element => {
      element.textContent = username;
    });
    
    
    const pendingAction = sessionStorage.getItem('pendingAction');
    const pendingBookId = sessionStorage.getItem('pendingBookId');
    
    if (pendingAction && pendingBookId) {
      if (pendingAction === 'borrow') {
        processBorrow(parseInt(pendingBookId));
      } else if (pendingAction === 'reserve') {
        processReserve(parseInt(pendingBookId));
      }
      
      
      sessionStorage.removeItem('pendingAction');
      sessionStorage.removeItem('pendingBookId');
    }
    
    
    document.getElementById('borrowed-books-section').style.display = 'block';
    loadBorrowedBooks();
  });
}


function setupModalClose(modalId, closeButtonClass) {
  const modal = document.getElementById(modalId);
  const closeButton = modal.querySelector(`.${closeButtonClass}`);
  
  closeButton.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}


function searchBooks() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  
  if (!searchInput) {
    loadBooks();
    return;
  }
  
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchInput) ||
    book.author.toLowerCase().includes(searchInput) ||
    book.genre.toLowerCase().includes(searchInput)
  );
  
  displayFilteredBooks(filteredBooks);
}


function filterBooks() {
  const availabilityFilter = document.getElementById('filter-availability').value;
  const genreFilter = document.getElementById('filter-genre').value;
  
  let filteredBooks = [...books];
  
  
  if (availabilityFilter !== 'all') {
    const isAvailable = availabilityFilter === 'available';
    filteredBooks = filteredBooks.filter(book => book.available === isAvailable);
  }
  
  
  if (genreFilter !== 'all') {
    filteredBooks = filteredBooks.filter(book => 
      book.genre.toLowerCase().includes(genreFilter.toLowerCase())
    );
  }
  
  displayFilteredBooks(filteredBooks);
}


function displayFilteredBooks(filteredBooks) {
  const booksListElement = document.getElementById('books-list');
  booksListElement.innerHTML = '';
  
  if (filteredBooks.length === 0) {
    booksListElement.innerHTML = '<p class="no-results">Nenhum livro encontrado.</p>';
    return;
  }
  
  filteredBooks.forEach(book => {
    const bookElement = createBookElement(book);
    booksListElement.appendChild(bookElement);
  });
}


function borrowBook(event) {
  const bookId = parseInt(event.target.dataset.bookId);
  
  
  if (!sessionStorage.getItem('username')) {
    
    sessionStorage.setItem('pendingAction', 'borrow');
    sessionStorage.setItem('pendingBookId', bookId);
    
    
    document.getElementById('login-modal').style.display = 'flex';
    return;
  }
  
  processBorrow(bookId);
}


function processBorrow(bookId) {
  
  const book = books.find(b => b.id === bookId);
  
  if (!book || !book.available) {
    showMessage('Erro', 'Este livro não está disponível para empréstimo.');
    return;
  }
  
  
  book.available = false;
  borrowedBooks.push({...book});
  
  
  document.getElementById('book-modal').style.display = 'none';
  
  
  showMessage('Empréstimo Realizado', `O livro "${book.title}" foi emprestado com sucesso. Por favor, devolva em até 14 dias.`);
  
  
  loadBooks();
  loadBorrowedBooks();
}


function reserveBook(event) {
  const bookId = parseInt(event.target.dataset.bookId);
  
  
  if (!sessionStorage.getItem('username')) {
    
    sessionStorage.setItem('pendingAction', 'reserve');
    sessionStorage.setItem('pendingBookId', bookId);
    
    
    document.getElementById('login-modal').style.display = 'flex';
    return;
  }
  
  processReserve(bookId);
}


function processReserve(bookId) {
  
  const book = books.find(b => b.id === bookId);
  
  if (!book) {
    showMessage('Erro', 'Livro não encontrado.');
    return;
  }
  
  if (book.available) {
    showMessage('Aviso', 'Este livro está disponível para empréstimo, não é necessário reservar.');
    return;
  }
  
  
  document.getElementById('book-modal').style.display = 'none';
  
  
  showMessage('Reserva Realizada', `O livro "${book.title}" foi reservado com sucesso. Você será notificado quando estiver disponível.`);
}


function returnBook(event) {
  const bookId = parseInt(event.target.dataset.bookId);
  
  
  const book = books.find(b => b.id === bookId);
  const borrowedIndex = borrowedBooks.findIndex(b => b.id === bookId);
  
  if (!book || borrowedIndex === -1) {
    showMessage('Erro', 'Não foi possível devolver este livro.');
    return;
  }
  
  
  book.available = true;
  borrowedBooks.splice(borrowedIndex, 1);
  
  
  document.getElementById('book-modal').style.display = 'none';
  
  
  showMessage('Devolução Realizada', `O livro "${book.title}" foi devolvido com sucesso. Obrigado!`);
  
  
  loadBooks();
  loadBorrowedBooks();
}


function renewBook(event) {
  const bookId = parseInt(event.target.dataset.bookId);
  
  
  const book = books.find(b => b.id === bookId);
  
  if (!book) {
    showMessage('Erro', 'Não foi possível renovar este livro.');
    return;
  }
  
  
  document.getElementById('book-modal').style.display = 'none';
  
  
  const successfulRenewal = Math.random() > 0.3;
  
  if (successfulRenewal) {
    showMessage('Renovação Realizada', `O empréstimo do livro "${book.title}" foi renovado por mais 14 dias.`);
  } else {
    showMessage('Renovação Negada', `Não foi possível renovar o livro "${book.title}". Motivo: Existe uma fila de espera para este livro.`);
  }
}


function showMessage(title, text) {
  const modal = document.getElementById('message-modal');
  document.getElementById('message-title').textContent = title;
  document.getElementById('message-text').textContent = text;
  modal.style.display = 'flex';
}
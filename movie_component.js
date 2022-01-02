const template = document.createElement('template');
const setComponentData = (rank, title, poster, rating, year) => {
  template.innerHTML = `
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style>
      @import "./style.css"
  </style>
  <div class="movie">
    <img class="movie-image" src="${poster}"/>
    <div class="opacity">
      <div class="info">
        <h4 class="movie-title">${rank}. ${title}</h4>
        <h5 class="movie-description">${year} - <i class="fa fa-star" aria-hidden="true"></i> ${rating}</h5>
        <button class="add-collection-button">+ MY COLLECTION</button>
      </div>
      <div class="watched-div">
        <img class="watched-button" src="./img/watched-button.png">
      </div>
    </div>
  </div>
`;
};

export default class MovieComponent extends HTMLElement {
  constructor(rank, title, poster, rating, year) {
    super();

    setComponentData(rank, title, poster, rating, year);
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  markWatched() {
    const watchedTick = this.shadowRoot.querySelector('.watched-button');
    if (watchedTick.getAttribute('src') === './img/watched-button.png') {
      watchedTick.setAttribute('src', './img/watched-button-green.png');
    } else {
      watchedTick.setAttribute('src', './img/watched-button.png');
    }
  }

  addToCollection() {
    const addCollectionBut = this.shadowRoot.querySelector(
      '.add-collection-button',
    );
    addCollectionBut.classList.toggle('added-movie');
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector('.watched-button')
      .addEventListener('click', () => this.markWatched());
    this.shadowRoot
      .querySelector('.add-collection-button')
      .addEventListener('click', () => this.addToCollection());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('.watched-button').removeEventListener();
    this.shadowRoot
      .querySelector('.add-collection-button')
      .removeEventListener();
  }
}

window.customElements.define('movie-component', MovieComponent);

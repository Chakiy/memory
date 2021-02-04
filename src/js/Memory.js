import Card from "./Card.js";

class Memory {
  constructor(lvl = 1) {
    this._allIcons = [];
    this._lvl = lvl;
    // this._username = username;
    // this._input = document.querySelector(".txt").value;
    this._first = null;
    this._second = null;
    this._selected = [];
    this._turned = [];
    this.fetchIcons();
    this._a = null;

    if (localStorage.get("meme")) {
      const persistedData = JSON.parse(localStorage.getItem("meme"));
      this._lvl = persistedData.lvl;
      this._allIcons = persistedData.icons;

      this.startLevel();
      this.init();
    } else {
      this.fetchIcons();
    }
  }

  saveToPersist() {
    localStorage.setItem(
      "meme",
      JSON.stringify({
        lvl: this._lvl,
        allCards: this._allIcons,
      })
    );
  }

  fetchIcons() {
    fetch("../../icons/selection.json")
      .then((response) => response.json())
      .then((data) => {
        this._allIcons = data.icons.map((el) => el.properties.name);
        this.init();
      })
      .catch((error) => console.log(error));
  }
  init() {
    // initiele html opbouwen (<div id="grid"></div>)

    let body = document.body;
    body.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="info-board">
        <p class="lvl"> level ${this._lvl}</p>
        </div>
    `
    );

    body.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="grid"></div> 
    `
    );
    this._htmlRef = document.querySelector(".grid");
    this.setUpEvents();
    this.startLevel();
  }

  setUpEvents() {
    window.addEventListener("flip", (e) => {
      const flippedCard = e.detail;
      this._turned.push(flippedCard);
      if (this._turned.length === 2) {
        if (this._turned[0]._iconName === this._turned[1]._iconName) {
          // match
          setInterval(() => {
            this._turned[0].block();
            this._turned[1].block();
            this._turned = [];
          }, 1000);
        } else {
          // no match
          setInterval(() => {
            this._turned[0].turn();
            this._turned[1].turn();
            this._turned = [];
          }, 1000);
        }
      }
    });
  }

  startLevel = () => {
    const aantalXCardsOpLvl = this._lvl * 2;
    const shuffled = this._allIcons.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, aantalXCardsOpLvl);
    const allPlayCards = this.shuffleArrOfCards([...selected, ...selected]);
    this._allPlayCardsLength = allPlayCards.length;
    allPlayCards.forEach((element) => {
      new Card(document.querySelector(".grid"), element);
    });
  };

  shuffleArrOfCards = (arr) => {
    let lng = arr.length,
      glob,
      i;
    while (lng > 0) {
      i = Math.floor(Math.random() * lng);
      lng--;
      glob = arr[lng];
      arr[lng] = arr[i];
      arr[i] = glob;
    }
    return arr;
  };
}

export default Memory;

import Card from "./Card.js";

class Memory {
  constructor(lvl = 2) {
    this._allIcons = [];
    this._lvl = lvl;
    // this._username = username;
    this._first = null;
    this._second = null;
    this._selected = [];
    this._turned = [];
    this.fetchIcons();

    //setUpEvents => luisteren naar flipped eventTypes
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
    //initiele html opbouwen (<div id="grid"></div>)
    let body = document.body;
    body.insertAdjacentHTML(
      "beforeend",
      `
        <div class="info-board">
        <p class="lvl"> ${this._lvl}</p>

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

  startLevel() {
    // op basis van levelnr
    // while(this._lvl < ){
    // if ((this._lvl = 2)) {
    //   let card = new Card(document.querySelector(".grid"), this._allIcons[11]);
    //   let card2 = new Card(document.querySelector(".grid"), this._allIcons[11]);
    // }
    const icons = [];
    const count = this._level * 2;
    while (icons.length !== count) {
      let randomIcon = this._allIcons[
        Math.floor(Math.random() * this._allIcons.length)
      ];
      if (icons.indexOf(randomIcon) === -1) {
        icons.push(randomIcon);
      }
      const allCards = [...icons, ...icons];

      // Shuffle array
      const shuffled = allCards.sort(() => 0.5 - Math.random());

      // Get sub-array of first n elements after shuffled
      let selected = shuffled.slice(0, 4);
      // console.log(selected);

      //CREATE CARDS

      let n = selected.length;
      // const holder = document.querySelector(".grid");
      // new Card(holder, selected);
      while (n > 0) {
        new Card(".grid", selected);
        n--;
      }
    }

    // function shuffle(a) {
    //   let i, s, x;
    //   for (i = a.length - 1; i > 0; i--) {
    //     s = Math.floor(Math.random() * (i + 1));
    //     x = a[i];
    //     a[i] = a[s];
    //     a[s] = x;
    //   }
    //   return a;
    // }

    // //SHUFFLE ARRAY
    // shuffle(allCards);

    // }
    //x aantal Card plaatsen in #grid
    //op basis van levelNr aantal unieke items uit array halen
    // new Card(".grid", "pencil||home||gear||tree||leaf");
    // const result = ["leaf", "gear"];
    // const allCards = [...result, ...result];
    //how to shuffle array
    //allCards.shuffle()
    //     1 => 2unieke => 4
    // 2 => 4unieke => 8
    // 3 => 8unieke => 16
  }
}

export default Memory;

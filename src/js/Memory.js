import Card from "./Card.js";

class Memory {
  constructor(lvl = 1) {
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
    document.body.insertAdjacentHTML(
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
    // if ((this._lvl === 2)) {
    //   let card = new Card(document.querySelector(".grid"), "home");
    //   let card2 = new Card(document.querySelector(".grid"), "home2");
    // }

    // }
    //x aantal Card plaatsen in #grid
    //op basis van levelNr aantal unieke items uit array halen
    new Card(".grid", "pencil||home||gear||tree||leaf");
    const result = ["leaf", "gear"];
    const allCards = [...result, ...result];
    //how to shuffle array
    //allCards.shuffle()
    //     1 => 2unieke => 4
    // 2 => 4unieke => 8
    // 3 => 8unieke => 16
  }
}

export default Memory;

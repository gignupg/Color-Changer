let dropDownActive = true;
let savingActive = false;
let dropdownExtended;
if (JSON.parse(localStorage.getItem("localDropdown")) === null) {
    dropdownExtended = [];
} else dropdownExtended = JSON.parse(localStorage.getItem("localDropdown"));

let layoutExtended;
if (JSON.parse(localStorage.getItem("localLayout")) === null) {
    layoutExtended = {};
} else layoutExtended = JSON.parse(localStorage.getItem("localLayout"));

document.addEventListener('keydown', myLayout);

function myLayout(e) {

    if (e.key === "ArrowUp") {      // Reset Layout
        e.preventDefault();
        setColors(layout.reset);
    }
    if (e.key === "ArrowDown") {    // Standard Layout 1
        e.preventDefault();
        setColors(layout.standard2);
    }
    if (e.key === "ArrowLeft") {    // Standard Layout 2
        e.preventDefault();
        setColors(layout.standard3);
    }
    if (e.key === "ArrowRight") {   // Standard Layout 3
        e.preventDefault();
        setColors(layout.standard1);
    }
}

function setColors({ randomtitle, randomsubheading, selectedtext1, selectedtext2 }) {
    localStorage.setItem("randomtitle", randomtitle);
    localStorage.setItem("randomsubheading", randomsubheading);
    localStorage.setItem("selectedtext1", selectedtext1);
    localStorage.setItem("selectedtext2", selectedtext2);
    renderMyApp();
}

const layout = {
    reset: {
        randomtitle: "RGB(0,0,0)",
        randomsubheading: "RGB(0,0,0)",
        selectedtext1: "RGB(0,0,0)",
        selectedtext2: "RGB(0,0,0)"
    },
    standard1: {
        randomtitle: "RGB(181, 124, 0)",
        randomsubheading: "RGB(84, 173, 0)",
        selectedtext1: "RGB(46, 118, 166)",
        selectedtext2: "RGB(166, 46, 46)"
    },
    standard2: {
        randomtitle: "RGB(96, 232, 37)",
        randomsubheading: "RGB(0, 234, 255)",
        selectedtext1: "RGB(0,0,0)",
        selectedtext2: "RGB(0,0,0)"
    },
    standard3: {
        randomtitle: "RGB(0,0,0)",
        randomsubheading: "RGB(255, 0, 21)",
        selectedtext1: "RGB(255, 0, 195)",
        selectedtext2: "RGB(80, 0, 105)"
    }
};

function deleterFunc(e) {
    const name = e.target.id;

    dropdownExtended = dropdownExtended.filter(elem => elem !== name);
    localStorage.setItem("localDropdown", JSON.stringify(dropdownExtended));

    delete layoutExtended[name];
    localStorage.setItem("localLayout", JSON.stringify(layoutExtended));

    location.reload();
}

const dropDownMenu = [
    <li className="visible" onClick={dropdownActivator} key="save">Save current layout</li>,
    <li className="visible" key="reset" onClick={() => setColors(layout.reset)}>Reset Layout</li>,
    <li className="visible" key="standard1" onClick={() => setColors(layout.standard1)}>Standard Layout 1</li>,
    <li className="visible" key="standard2" onClick={() => setColors(layout.standard2)}>Standard Layout 2</li>,
    <li className="visible" key="standard3" onClick={() => setColors(layout.standard3)}>Standard Layout 3</li>,
    dropdownExtended.map(elem => <div className="deleteTag" key={elem}><li className="deletable visible" onClick={() => setColors(layoutExtended[elem])}>{elem}</li><li id={elem} className="deleteMe" onClick={(e) => deleterFunc(e)}>Delete</li></div>)
];

const myPlaceholder = "Choose a color!";

const randomiser = (elem) => {
    const myMap = [...Array(3)].map(() => Math.floor(Math.random() * 256));
    localStorage.setItem("random" + elem, "RGB(" + myMap + ")");
    renderMyApp();
};

const customColorChanger = (e, item) => {
    e.preventDefault();
    const para = "para" + item;

    localStorage.setItem("selectedtext" + item, e.target.elements[para].value);
    e.target.elements[para].value = "";

    renderMyApp();
};

function dropdownActivator() {
    dropDownActive = !dropDownActive;
    savingActive = !savingActive;
    renderMyApp();
    if (savingActive) {
        window.setTimeout(function ()
    {
        document.getElementById("myInputBox").focus();
    }, 0);
    }
    
}

function saveCustomLayout(e) {
    e.preventDefault();
    const userInput = e.target.elements.saveLayout.value.trim();

    if (userInput && userInput.length <= 25 && userInput && !dropdownExtended.some(e => e === userInput)) {

        dropdownExtended.push(userInput);
        localStorage.setItem("localDropdown", JSON.stringify(dropdownExtended));

        layoutExtended[userInput] = {
            randomtitle: localStorage.getItem("randomtitle"),
            randomsubheading: localStorage.getItem("randomsubheading"),
            selectedtext1: localStorage.getItem("selectedtext1"),
            selectedtext2: localStorage.getItem("selectedtext2")
        };
        localStorage.setItem("localLayout", JSON.stringify(layoutExtended));

        dropdownActivator();
        location.reload();
    } else alert("Names must be unique and between one 1 and 30 characters long!");
}

const savingMenu = [(
    <div id="savingMenu" key="savingMenu">
        <form onSubmit={e => saveCustomLayout(e)}>
            <input type="text" id="myInputBox" name="saveLayout" placeholder="Choose a layout name" />
            <button type="submit" className="savingLayoutInput">Save</button>
            <button type="button" onClick={dropdownActivator} className="savingLayoutInput">Cancel</button>
        </form>
    </div>
)
];

const renderMyApp = () => {
    const MyApp = () => (
        <div>
            <h1 onClick={() => randomiser("title")} style={{ color: localStorage.getItem("randomtitle") }}>Color Changer</h1>
            <div id="middleBox">
                <h2 onClick={() => randomiser("subheading")} style={{ color: localStorage.getItem("randomsubheading") }}>User Guide</h2>
                <div className="textParagraph" style={{ color: localStorage.getItem("selectedtext1") }}>
                    <p>
                        The color of heading 1 and heading 2 can be changed by clicking on it. Try it out! Each time you click on it a random colour will be chosen and displayed.
                        The color of the text paragraphs can be altered too, though not by clicking on them but by typing in the desired color in the input field beneath each paragraph, confirming with enter.
                        If you don&apos;t want to customize the layout yourself you can simply select one of the predefined layouts which can be accessed by using the Arrow Keys or by clicking on the &quot;Layout&quot; buttons and using the dropdownmenu to select a layout.
                        To reset the layout via hotkey press the Arrow Up key. Feel free to try out all layouts!
                    </p>
                    <form onSubmit={(elem) => customColorChanger(elem, 1)}>
                        <input className="custom-color" type="text" placeholder={myPlaceholder} name="para1" />
                    </form>
                </div>
                <h2 onClick={() => randomiser("subheading")} style={{ color: localStorage.getItem("randomsubheading") }}>Sample Text</h2>
                <div className="textParagraph" style={{ color: localStorage.getItem("selectedtext2") }}>
                    <p>
                        It’s easy to get lost in the confusing symbology of your mind.
                        When you have a nightmare about falling or a dream about flying, it’s easy to interpret those experiences as literal.
                        It must mean you are afraid of falling or you wish to fly, right?
                        Think again!
                        A falling dream might just be about your fear that you’re losing control in your relationship and a flying dream may be about your desire to be free from that relationship.
                        So, how do you figure out what these confusing symbols mean?
                        Lucid dreaming lets you take a front-row seat to those dreams and experience them in real-time. Learning how to have a lucid dream gives you the password to your subconscious mind and lets you actively seek to understand before your conscious mind has an opportunity to interrupt and confuse you.
                    </p>
                    <form onSubmit={(elem) => customColorChanger(elem, 2)}>
                        <input className="custom-color" type="text" placeholder={myPlaceholder} name="para2" />
                    </form>
                </div>
            </div>
            <ul>
                <li id="layout-options">Layouts:
                    <ul>
                        {dropDownActive && dropDownMenu}
                        {savingActive && savingMenu}
                    </ul>
                </li>
            </ul>
        </div>
    );
    // eslint-disable-next-line no-undef
    ReactDOM
        .render(<MyApp />, document.querySelector("#app"));
};

renderMyApp();
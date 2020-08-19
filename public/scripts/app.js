"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var dropDownActive = true;
var savingActive = false;
var dropdownExtended = void 0;
if (JSON.parse(localStorage.getItem("localDropdown")) === null) {
    dropdownExtended = [];
} else dropdownExtended = JSON.parse(localStorage.getItem("localDropdown"));

var layoutExtended = void 0;
if (JSON.parse(localStorage.getItem("localLayout")) === null) {
    layoutExtended = {};
} else layoutExtended = JSON.parse(localStorage.getItem("localLayout"));

document.addEventListener('keydown', myLayout);

function myLayout(e) {

    if (e.key === "ArrowUp") {
        // Reset Layout
        e.preventDefault();
        setColors(layout.reset);
    }
    if (e.key === "ArrowDown") {
        // Standard Layout 1
        e.preventDefault();
        setColors(layout.standard2);
    }
    if (e.key === "ArrowLeft") {
        // Standard Layout 2
        e.preventDefault();
        setColors(layout.standard3);
    }
    if (e.key === "ArrowRight") {
        // Standard Layout 3
        e.preventDefault();
        setColors(layout.standard1);
    }
}

function setColors(_ref) {
    var randomtitle = _ref.randomtitle,
        randomsubheading = _ref.randomsubheading,
        selectedtext1 = _ref.selectedtext1,
        selectedtext2 = _ref.selectedtext2;

    localStorage.setItem("randomtitle", randomtitle);
    localStorage.setItem("randomsubheading", randomsubheading);
    localStorage.setItem("selectedtext1", selectedtext1);
    localStorage.setItem("selectedtext2", selectedtext2);
    renderMyApp();
}

var layout = {
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
    var name = e.target.id;

    dropdownExtended = dropdownExtended.filter(function (elem) {
        return elem !== name;
    });
    localStorage.setItem("localDropdown", JSON.stringify(dropdownExtended));

    delete layoutExtended[name];
    localStorage.setItem("localLayout", JSON.stringify(layoutExtended));

    location.reload();
}

var dropDownMenu = [React.createElement(
    "li",
    { className: "visible", onClick: dropdownActivator, key: "save" },
    "Save current layout"
), React.createElement(
    "li",
    { className: "visible", key: "reset", onClick: function onClick() {
            return setColors(layout.reset);
        } },
    "Reset Layout"
), React.createElement(
    "li",
    { className: "visible", key: "standard1", onClick: function onClick() {
            return setColors(layout.standard1);
        } },
    "Standard Layout 1"
), React.createElement(
    "li",
    { className: "visible", key: "standard2", onClick: function onClick() {
            return setColors(layout.standard2);
        } },
    "Standard Layout 2"
), React.createElement(
    "li",
    { className: "visible", key: "standard3", onClick: function onClick() {
            return setColors(layout.standard3);
        } },
    "Standard Layout 3"
), dropdownExtended.map(function (elem) {
    return React.createElement(
        "div",
        { className: "deleteTag", key: elem },
        React.createElement(
            "li",
            { className: "deletable visible", onClick: function onClick() {
                    return setColors(layoutExtended[elem]);
                } },
            elem
        ),
        React.createElement(
            "li",
            { id: elem, className: "deleteMe", onClick: function onClick(e) {
                    return deleterFunc(e);
                } },
            "Delete"
        )
    );
})];

var myPlaceholder = "Choose a color!";

var randomiser = function randomiser(elem) {
    var myMap = [].concat(_toConsumableArray(Array(3))).map(function () {
        return Math.floor(Math.random() * 256);
    });
    localStorage.setItem("random" + elem, "RGB(" + myMap + ")");
    renderMyApp();
};

var customColorChanger = function customColorChanger(e, item) {
    e.preventDefault();
    var para = "para" + item;

    localStorage.setItem("selectedtext" + item, e.target.elements[para].value);
    e.target.elements[para].value = "";

    renderMyApp();
};

function dropdownActivator() {
    dropDownActive = !dropDownActive;
    savingActive = !savingActive;
    renderMyApp();
    if (savingActive) {
        window.setTimeout(function () {
            document.getElementById("myInputBox").focus();
        }, 0);
    }
}

function saveCustomLayout(e) {
    e.preventDefault();
    var userInput = e.target.elements.saveLayout.value.trim();

    if (userInput && userInput.length <= 25 && userInput && !dropdownExtended.some(function (e) {
        return e === userInput;
    })) {

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

var savingMenu = [React.createElement(
    "div",
    { id: "savingMenu", key: "savingMenu" },
    React.createElement(
        "form",
        { onSubmit: function onSubmit(e) {
                return saveCustomLayout(e);
            } },
        React.createElement("input", { type: "text", id: "myInputBox", name: "saveLayout", placeholder: "Choose a layout name" }),
        React.createElement(
            "button",
            { type: "submit", className: "savingLayoutInput" },
            "Save"
        ),
        React.createElement(
            "button",
            { type: "button", onClick: dropdownActivator, className: "savingLayoutInput" },
            "Cancel"
        )
    )
)];

var renderMyApp = function renderMyApp() {
    var MyApp = function MyApp() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                { onClick: function onClick() {
                        return randomiser("title");
                    }, style: { color: localStorage.getItem("randomtitle") } },
                "Color Changer"
            ),
            React.createElement(
                "div",
                { id: "middleBox" },
                React.createElement(
                    "h2",
                    { onClick: function onClick() {
                            return randomiser("subheading");
                        }, style: { color: localStorage.getItem("randomsubheading") } },
                    "User Guide"
                ),
                React.createElement(
                    "div",
                    { className: "textParagraph", style: { color: localStorage.getItem("selectedtext1") } },
                    React.createElement(
                        "p",
                        null,
                        "The color of heading 1 and heading 2 can be changed by clicking on it. Try it out! Each time you click on it a random colour will be chosen and displayed. The color of the text paragraphs can be altered too, though not by clicking on them but by typing in the desired color in the input field beneath each paragraph, confirming with enter. If you don't want to customize the layout yourself you can simply select one of the predefined layouts which can be accessed by using the Arrow Keys or by clicking on the \"Layout\" buttons and using the dropdownmenu to select a layout. To reset the layout via hotkey press the Arrow Up key. Feel free to try out all layouts!"
                    ),
                    React.createElement(
                        "form",
                        { onSubmit: function onSubmit(elem) {
                                return customColorChanger(elem, 1);
                            } },
                        React.createElement("input", { className: "custom-color", type: "text", placeholder: myPlaceholder, name: "para1" })
                    )
                ),
                React.createElement(
                    "h2",
                    { onClick: function onClick() {
                            return randomiser("subheading");
                        }, style: { color: localStorage.getItem("randomsubheading") } },
                    "Sample Text"
                ),
                React.createElement(
                    "div",
                    { className: "textParagraph", style: { color: localStorage.getItem("selectedtext2") } },
                    React.createElement(
                        "p",
                        null,
                        "It\u2019s easy to get lost in the confusing symbology of your mind. When you have a nightmare about falling or a dream about flying, it\u2019s easy to interpret those experiences as literal. It must mean you are afraid of falling or you wish to fly, right? Think again! A falling dream might just be about your fear that you\u2019re losing control in your relationship and a flying dream may be about your desire to be free from that relationship. So, how do you figure out what these confusing symbols mean? Lucid dreaming lets you take a front-row seat to those dreams and experience them in real-time. Learning how to have a lucid dream gives you the password to your subconscious mind and lets you actively seek to understand before your conscious mind has an opportunity to interrupt and confuse you."
                    ),
                    React.createElement(
                        "form",
                        { onSubmit: function onSubmit(elem) {
                                return customColorChanger(elem, 2);
                            } },
                        React.createElement("input", { className: "custom-color", type: "text", placeholder: myPlaceholder, name: "para2" })
                    )
                )
            ),
            React.createElement(
                "ul",
                null,
                React.createElement(
                    "li",
                    { id: "layout-options" },
                    "Layouts:",
                    React.createElement(
                        "ul",
                        null,
                        dropDownActive && dropDownMenu,
                        savingActive && savingMenu
                    )
                )
            )
        );
    };
    // eslint-disable-next-line no-undef
    ReactDOM.render(React.createElement(MyApp, null), document.querySelector("#app"));
};

renderMyApp();

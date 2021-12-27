
function KeyPressTrigger(event) {
    let key = event.key.toLowerCase();
    //var lowercase = event.key.toLowerCase();
    let keybind = lib.find(Settings.keys, "key", key);
    if (keybind) {
        KeyTriggers[keybind.action]();
    }
}

var KeyTriggers = {
    up: function () {
        Menu.Move(-1);
    },
    down: function () {
        Menu.Move(1);
    },
    action: function () {
        Menu.ActionSelected();
    },
    settings: function () {
        Settings.open();
    }
};

var Menu = {
    Move: function (increment) {
        let index = 0;

        let menu = document.getElementById("actions");
        let selected = menu.querySelector(".selected");

        if (selected) {
            index = Array.prototype.indexOf.call(menu.children, selected);
            selected.classList.remove("selected");
        }

        index = index + increment;
        maxNodes = menu.childElementCount;
        if (index < 0) {
            index = maxNodes - 1;
        }
        if (index >= maxNodes) {
            index = 0;
        }
        menu.children[index].classList.add("selected");
    },
    ActionSelected: function () {
        //get selected
        // data-action   data-value
    }
};
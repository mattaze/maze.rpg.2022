var Settings = Settings || {};

Settings.keys = [
    { key: "w", code:"keyw", action: "up", description: "move menu up" },
    { key: "arrowup", action: "up", description: "(alt) move menu up" },
    { key: "s", action: "down", description: "move menu down" },
    { key: "arrowdown", action: "down", description: "(alt) move menu down" },
    { key: "enter", action: "action", description: "select action" },
    { key: " ", code:"space", action: "action", description: "(alt) select action" },
    { key: "p", action: "settings", description: "open settings" },

    { key: "1", action: "action1", description: "menu option 1" },
    { key: "2", action: "action2", description: "menu option 2" },
    { key: "3", action: "action3", description: "menu option 3" },
    { key: "4", action: "action4", description: "menu option 4" },
    { key: "5", action: "action5", description: "menu option 5" },
    { key: "6", action: "action6", description: "menu option 6" }

];

/**
 * keymap 
 */
Settings.keyMap =  {
    "w": "up",

}

Settings.open = function () {

};

Settings.apply = function () {
    //update keys
    //update display


};
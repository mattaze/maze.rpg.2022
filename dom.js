/**
 * DOM management javascript
 */
var cw = cw || {};

 (function() {
    //alt apply - cw passed in
    //this = cw object.
    let self = this.dom = {};
    let s = self;
   // self.system = this; //engine??
    s.elms = {
        message: "message",
        output: "output",
        button: "<button data-action='@a' data-value='@v'>@t</button>"
    };
    

    /**
     * global click event handler
     * @param
     */
    // self.clickEvent = function(event) {
    //     if(event.target.nodeName == 'BUTTON') {
    //         let action = event.target.dataset.action;
            
    //         //using textContent saved having dataset item.
    //         //however for alt-languages - dataset useful for code and leave display text flexible.
    //         //let value = event.target.dataset.value;
    //         //let value = event.target.textContent;
            
    //         self.system.next(action);

    //         // let action_function = self.system[self.system.mode][action];
    //         // if(action_function) {
    //         //     action_function(value);
    //         // }

    //         return false;
    //     } else {
    //         //too next text dialog.
    //         self.system.next();
    //     }
    // };
    // window.addEventListener("click", self.clickEvent, false);

    /**
     * update DOM
     * @param {Object} obj reference object
     * @param {String} target base 'data-' attribute reference
     */
    self.update = function(obj, target) {
        //if span -
        let elements = document.querySelectorAll("[data-" + target + "]");
        elements.forEach((elm) => {
            let attribute = elm.dataset[target];
            let value = lib.byString(obj, attribute);
            if(value === undefined) {
                return;
            }
            
            if(self.updateType[attribute]) {
                self.updateType[attribute](elm, lib.byString(obj, attribute));
            }
            else if(self.updateType[elm.nodeName]) {
                self.updateType[elm.nodeName](elm, lib.byString(obj, attribute));
            }
            else {
                elm.textContent = lib.byString(obj, attribute);
            }
        });
    };
    
    self.updateType = {};
    self.updateType.IMG = function(img_elm, attribute) {
        //could you data define what part of element attribute needs updating - text - textContent/ style??
        var url = attribute.url || attribute.src || attribute;
        img_elm.src = url;
        return img_elm;
    };
    /**
     * todo: reduce amount of times image is update - when no need to update
     */
    self.updateType.image = function(img_container, attribute) {
        let sprite = attribute;
        if(!attribute.sprite) {
            let img_elm = document.createElement("img");
            var url = attribute.url || attribute.src || attribute;
            img_elm.src = url;
            
            img_container.innerHTML = "";
            img_container.appendChild(img_elm);
            return img_container;
        }
        
        var sprite_sheet = SpriteSheets[attribute.sheet];
        
        var target_w = img_container.clientWidth;
        var target_h = img_container.clientHeight;
        var scaling = target_w / attribute.w;
        
        var sprite_div = "<div style='";
        sprite_div += "background: url(" + sprite_sheet.url + ");";
        sprite_div += "background-repeat: no-repeat;";
        sprite_div += "display: inline-block;";
        sprite_div += "background-position: " + sprite.x * scaling + "px " + sprite.y * scaling + "px;";
        sprite_div += "width: " + target_w + "px;";
        sprite_div += "height: " + target_h + "px;";
        sprite_div += "background-size: " + sprite_sheet.w * scaling + "px auto;";
        sprite_div += "'></div>";
        
        img_container.innerHTML = sprite_div;
    };
    
    /**
     * set the sub menu section within a menu as the active action
     * @param {String} id sub menu for active selection
     */
    self.setSubMenu = function(id) {
        let elm = document.getElementById(id);
        if(!elm) {
            console.error("setSubMenu not found id: " + id);
            return;
        }
        let current_active = elm.parentElement.querySelector('.sub-menu.active');
        if(current_active) {
            current_active.classList.remove('active');
        }
        
        elm.classList.add('active');
    };
    
    /**
     * set the sub menu section within a menu as the active action
     * ALT renaming version of setSubMenu
     * @param {String} id sub menu for active selection
     */
    self.setDisplay = function(id) {
        let elm = document.getElementById(id);
        if(!elm) {
            console.error("setDisplay not found id: " + id);
            return;
        }
        let current_active = elm.parentElement.querySelector('.output.active');
        if(current_active) {
            current_active.classList.remove('active');
        }
        
        elm.classList.add('active');
    };
    
    s._messageLastDisplayID = "";
    
    /**
     * display the MESSAGE window with text
     * @param
     */
    self.message = function(text) {
        if(text) {
            //animate text load
            document.getElementById(s.elms.message).textContent = text;
            //last display:
            s._messageLastDisplayID = document.querySelector(".output.active").id;
                        
            self.setDisplay(s.elms.message);
            return true;
        }
        //is message still loading?
        //true
        let message_loading = false;
        if(message_loading) {
            //finish message load
            return true;
        }
        
        //false
        //hide message window, and return to last window
        s.closeMessage();
        return false;
    };
    
    s.closeMessage = function() {
        s.setDisplay(s._messageLastDisplayID);
    };
    
    /**
     * provide array of strings for menu buttons
     * strings will use dictionary to look up if language conversion
     * 
     * @param {String} data_action use array object attribute for data-action
     * @param {String} data_value use array object attribute for data-value
     */
    self.setMenu = function(id, array, data_action, data_value) {
        let elm = document.getElementById(id);
        if(!elm){
            console.error("setMenu not found id: " + id);
            return;
        }
        let buttons = array.reduce(self.func.reduceButtons, "");
        elm.innerHTML = buttons;
    };
    
    
    
    self.func ={};
    self.func.reduceButtons = (total, current) => 
        total + self.func.rp(self.elms.button, {'@a': current, '@t': dic(current)});
    
    /**
     * short hand replace key value paris in obj in the str
     * @param {string} str
     * @param {object} obj
     */
    self.func.rp = function(str, obj) {
        let new_str = str.replace("","");
        for(let attr in obj) {
            new_str = new_str.replace(attr, obj[attr]);
        }
        return new_str;
    };
    
    /**
     * 
     */
    self.menu = function(options) {
        
    };

    return self;
}).apply(cw);
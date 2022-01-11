/**
 * @file initialize and run when dom ready
 * @author MAze
 */

document.addEventListener("DOMContentLoaded", function(event) {
    document.addEventListener("keydown", KeyPressTrigger);
    document.body.addEventListener("click", MenuClicked);

    //Menu.MainMenu();
});
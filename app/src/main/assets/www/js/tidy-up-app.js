function TidyUpApp()
{
    this.intro = new TidyUpAppIntro();
    this.main = new TidyUpAppMain();
    this.menu = new TidyUpAppMenu();
};

TidyUpApp.prototype.init = function()
{
    this.intro.start();
    var this_intro = this.intro;
    var this_main = this.main;
    var interval = setInterval(function(){
        if (this_intro.done === true){
            clearInterval(interval);
            this_main.load();
        }
    }, 250);


    // we need a click handler from the menu registered here so that we can reset the app
    this.register_new_timer_click();
};

TidyUpApp.prototype.register_new_timer_click = function(){
    var this_ref = this;
    this.menu.menu_new_timer_btn.on('click', function(){
        if (this_ref.main.timer !== null){
            this_ref.main.timer.pause();
        }
        this_ref.main.show_selection_screen();
    });
};
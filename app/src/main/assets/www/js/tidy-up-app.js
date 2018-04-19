function TidyUpApp()
{
    this.intro = new TidyUpAppIntro();
    this.main = new TidyUpAppMain();
    this.menu = new TidyUpAppMenu();
    this.timer_selection_buttons = $('.select-time-btn');
    this.timer_selection_wrapper = $('#timer-selection-wrapper');

    this.register_handlers();

};

TidyUpApp.prototype.hide_selection_screen = function(){
    this.timer_selection_wrapper.addClass('hidden');
};

TidyUpApp.prototype.init = function()
{
    this.intro.start();
    var this_intro = this.intro;
    var this_main = this.main;
    var this_ref = this;
    var interval = setInterval(function(){
        if (this_intro.done === true){
            clearInterval(interval);
            this_main.load();
            this_ref.show_selection_screen();
        }
    }, 100);
};

TidyUpApp.prototype.register_handlers = function(){
    this.register_new_timer_click();
    this.register_timer_selection_click();
};


TidyUpApp.prototype.register_new_timer_click = function(){
    var this_ref = this;
    this.menu.menu_new_timer_btn.on('click', function(){
        if (this_ref.main.timer !== null){
            this_ref.main.timer.destroy();
        }
        this_ref.show_selection_screen();
    });
};

TidyUpApp.prototype.register_timer_selection_click = function(){
    var this_ref = this;
    this.timer_selection_buttons.on('click', function(){
        this_ref.hide_selection_screen();
        this_ref.menu.close();

        if (this_ref.main.timer && this_ref.main.timer.interval){
            this_ref.main.timer.destroy();
        }
        this_ref.main.timer = new TidyUpAppTimer();
        this_ref.main.timer.total_seconds = $(this).data('seconds');
        this_ref.main.timer.total_starting_seconds = this_ref.total_seconds;
        this_ref.main.timer.refresh();
    });
};

TidyUpApp.prototype.show_selection_screen = function(){
    this.timer_selection_wrapper.removeClass('hidden');
};
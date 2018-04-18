function TidyUpAppMain(){
    this.main_el = $('#main');
    this.timer = null;
    this.timer_selection_buttons = $('.select-time-btn');
    this.timer_selection_wrapper = $('#timer-selection-wrapper');
    this.register_handlers();
};

TidyUpAppMain.prototype.load = function(){
    this.main_el.removeClass('hidden');
    this.show_selection_screen();
    this.timer = new TidyUpAppTimer();
};

TidyUpAppMain.prototype.hide_selection_screen = function(){
    this.timer_selection_wrapper.addClass('hidden');
};

TidyUpAppMain.prototype.register_handlers = function(){
    var this_ref = this;
    this.timer_selection_buttons.on('click', function(){
        this_ref.hide_selection_screen();

        if (this_ref.timer && this_ref.timer.interval){
            clearInterval(this_ref.timer.interval);
        }
        this_ref.timer = new TidyUpAppTimer();
        this_ref.timer.total_seconds = $(this).data('seconds');
        this_ref.timer.refresh();
    });
};

TidyUpAppMain.prototype.show_selection_screen = function(){
    this.timer_selection_wrapper.removeClass('hidden');
};
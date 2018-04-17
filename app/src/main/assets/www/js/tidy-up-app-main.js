function TidyUpAppMain(){
    this.main_el = $('#main');
    this.timer = null;
    this.timer_selection_buttons = $('.select-time-btn');
    this.register_handlers();
};

TidyUpAppMain.prototype.load = function(){
    this.main_el.removeClass('hidden');
    this.timer = new TidyUpAppTimer();
};

TidyUpAppMain.prototype.register_handlers = function(){
    var this_ref = this;
    this.timer_selection_buttons.on('click', function(){
        if (this_ref.timer && this_ref.timer.interval){
            clearInterval(this_ref.timer.interval);
        }
        this_ref.timer = new TidyUpAppTimer();
        this_ref.timer.total_seconds = $(this).data('seconds');
        this_ref.timer.refresh();
    });
};
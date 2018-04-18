function TidyUpAppTimer(){
    this.interval = null;
    this.items_cleaned = 0;
    this.minutes_el = $('#timer-minutes');
    this.seconds_el = $('#timer-seconds');
    this.timer_add_item_button = $('#timer-add-item');
    this.timer_items_added_el = $('#timer-items-added');
    this.timer_pause_button= $('#timer-pause');
    this.timer_start_button = $('#timer-start');
    this.total_seconds = 120;

    this.register_handlers();
    console.log('creating new timer');
}

TidyUpAppTimer.prototype.decrement = function(){
    this.total_seconds--;
};

TidyUpAppTimer.prototype.items_increment = function(){
    this.items_cleaned++;
};

TidyUpAppTimer.prototype.is_running = function(){
    return (this.interval !== null);
};

TidyUpAppTimer.prototype.pause = function(){
    console.log('pausing');
    clearInterval(this.interval);
    this.interval = null;
};

TidyUpAppTimer.prototype.refresh = function(){
    this.minutes_el.html(this.zero_pad(parseInt(this.total_seconds / 60)));
    this.seconds_el.html(this.zero_pad(this.total_seconds % 60));

    if (!this.is_running()){
        this.timer_pause_button.addClass('disabled-btn');
        this.timer_start_button.removeClass('disabled-btn');
    } else {
        this.timer_pause_button.removeClass('disabled-btn');
        this.timer_start_button.addClass('disabled-btn');
    }
    this.timer_items_added_el.html(this.items_cleaned);

    console.log(this);
};

TidyUpAppTimer.prototype.register_handlers = function(){
    var this_ref = this;

    this.timer_pause_button.off('click').on('click', function(){
        this_ref.pause();

    });
    this.timer_start_button.off('click').on('click', function(){
        this_ref.start();
    });

    this.timer_add_item_button.off('click').on('click', function(){
        if (this_ref.is_running()){
            this_ref.items_increment();
            this_ref.refresh();
        }
    });
};

TidyUpAppTimer.prototype.start = function(){
    console.log('starting');
    if (!this.is_running()){
        var this_ref = this;
        this.interval = setInterval(function(){
            if (this_ref.total_seconds <= 0){
                this_ref.pause();
                this_ref.refresh();
            } else {
                this_ref.decrement();
                this_ref.refresh();
            }
        }, 1000);
    }
};

TidyUpAppTimer.prototype.zero_pad = function(val){
    if (val < 10){
        return '0' + val;
    } else {
    return '' + val;
    }
};
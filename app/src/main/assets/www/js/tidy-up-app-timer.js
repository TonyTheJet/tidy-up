function TidyUpAppTimer(){
    this.click_sound = new Audio('audio/click.ogg');
    this.interval = null;
    this.items_cleaned = 0;
    this.minutes_el = $('#timer-minutes');
    this.mute_button = $('#timer-mute-music');
    this.pause_sound = new Audio('audio/pause.ogg');
    this.seconds_el = $('#timer-seconds');
    this.started = false;
    this.timer_add_item_button = $('#timer-add-item');
    this.timer_bell = new Audio('audio/finish-bell.mp3');
    this.timer_items_added_el = $('#timer-items-added');
    this.timer_music = new Audio('audio/timer-music.mp3');
    this.timer_music.loop = true;
    this.timer_pause_button= $('#timer-pause');
    this.timer_start_button = $('#timer-start');
    this.total_seconds = 120;
    this.total_starting_seconds = 120;

    this.register_handlers();
}

TidyUpAppTimer.prototype.decrement = function(){
    this.total_seconds--;
};

TidyUpAppTimer.prototype.destroy = function(){
    this.items_cleaned = 0;
    this.pause();
    this.started = false;
    this.timer_music.pause();
    this.total_seconds = this.total_starting_seconds;
    this.refresh();
};

TidyUpAppTimer.prototype.items_increment = function(){
    this.items_cleaned++;
};

TidyUpAppTimer.prototype.is_running = function(){
    return (this.interval !== null);
};

TidyUpAppTimer.prototype.pause = function(){
    clearInterval(this.interval);
    this.interval = null;
    this.refresh();
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
};

TidyUpAppTimer.prototype.register_handlers = function(){
    var this_ref = this;

    this.timer_pause_button.off('click').on('click', function(){
        if (this_ref.is_running()){
            window.navigator.vibrate(50);
            this_ref.pause();
            this_ref.pause_sound.play();
            this_ref.timer_music.pause();
        }


    });
    this.timer_start_button.off('click').on('click', function(){
        if (!this_ref.is_running() && this_ref.total_seconds > 0){
            window.navigator.vibrate(100);
            this_ref.start();
            this_ref.timer_bell.play();
            this_ref.timer_music.play();
        }
    });

    this.timer_add_item_button.off('click').on('click', function(){
        if (this_ref.is_running()){
            window.navigator.vibrate(10);
            this_ref.click_sound.play();
            this_ref.items_increment();
            this_ref.refresh();
        }
    });

    // mute music
    this.mute_button.on('click', function(){
        if (this_ref.timer_music.muted){
            this_ref.timer_music.muted = false;
            this_ref.mute_button.html('mute music');
        }
        else{
            this_ref.timer_music.muted = true;
            this_ref.mute_button.html('play music');
        }
    });
};

TidyUpAppTimer.prototype.start = function(){
    this.started = true;
    if (!this.is_running()){
        var this_ref = this;
        this.interval = setInterval(function(){
            if (this_ref.total_seconds <= 0){
                this_ref.pause();
                this_ref.refresh();
                this_ref.timer_bell.play();
                this_ref.timer_music.pause();
            } else {
                this_ref.decrement();
                this_ref.refresh();
            }
        }, 1000);
        this.refresh();
    }
};

TidyUpAppTimer.prototype.zero_pad = function(val){
    if (val < 10){
        return '0' + val;
    } else {
    return '' + val;
    }
};
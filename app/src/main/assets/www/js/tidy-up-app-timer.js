function TidyUpAppTimer(){
    this.click_sound = new Audio('audio/click.ogg');
    this.countdown_beep = new Audio('audio/beep.mp3');
    this.get_ready_countdown_number = $('#get-ready-countdown-number');
    this.get_ready_message = $('#get-ready-message');
    this.get_ready_screen = $('#get-ready-screen-wrapper');
    this.interval = null;
    this.items_cleaned = 0;
    this.minutes_el = $('#timer-minutes');
    this.mute_button = $('#timer-mute-music');
    this.pause_sound = new Audio('audio/pause.ogg');
    this.score_modal = $('#score-info-modal');
    this.score_modal_items_per_minute = $('#score-info-modal-items-per-minute');
    this.score_modal_rank = $('#score-info-modal-rank');
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
    this.toy_basket = new TidyUpAppTimerToyBasket();

    // make sure to empty the toy basket each time this object is created
    this.toy_basket.empty();

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

TidyUpAppTimer.prototype.get_ready_countdown_increment = function(i, timeout){
    var this_ref = this;
    setTimeout(
        function(){
            if (i > 0){
                this_ref.get_ready_countdown_number.html(i);
                this_ref.countdown_beep.play();
            } else {
                this_ref.start();
                this_ref.timer_bell.play();
                this_ref.timer_music.play();
                this_ref.hide_get_ready_screen();
                this_ref.get_ready_message.removeClass('hidden');
                this_ref.get_ready_countdown_number.addClass('hidden');
                this_ref.get_ready_countdown_number.html('3');
            }
        },
        timeout
    );
}

TidyUpAppTimer.prototype.hide_get_ready_screen = function(){
    this.get_ready_screen.addClass('hidden');
};

TidyUpAppTimer.prototype.items_increment = function(){
    this.items_cleaned++;
};

TidyUpAppTimer.prototype.is_running = function(){
    return (this.interval !== null);
};

TidyUpAppTimer.prototype.load_get_ready_screen = function(){
    this.get_ready_screen.removeClass('hidden');
    var this_ref = this;
    setTimeout(function(){
        this_ref.get_ready_message.addClass('hidden');
        this_ref.get_ready_countdown_number.removeClass('hidden');
    }, 4000);
    for (var i = 3; i >= 0; i--){
        this.get_ready_countdown_increment(i, 7000 - (i * 1000));
    }
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
            this_ref.timer_add_item_button.addClass('disabled');
            this_ref.pause();
            this_ref.pause_sound.play();
            this_ref.timer_music.pause();
        }


    });
    this.timer_start_button.off('click').on('click', function(){
        if (!this_ref.is_running() && this_ref.total_seconds > 0){
            window.navigator.vibrate(100);
            this_ref.timer_add_item_button.removeClass('disabled');
            if (this_ref.total_seconds == this_ref.total_starting_seconds){
                this_ref.click_sound.play();
                this_ref.load_get_ready_screen();
            } else {
                this_ref.start();
                this_ref.timer_bell.play();
                this_ref.timer_music.play();
            }
        }
    });

    this.timer_add_item_button.off('click').on('click', function(){
        if (this_ref.is_running()){
            window.navigator.vibrate(10);
            this_ref.click_sound.play();
            this_ref.items_increment();
            this_ref.toy_basket.add_item();
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

    // pause it when the webView loses focus
    $(window).blur(function(){
        if (this_ref.is_running()){
            window.navigator.vibrate(50);
            this_ref.timer_add_item_button.addClass('disabled');
            this_ref.pause();
            this_ref.pause_sound.play();
            this_ref.timer_music.pause();
        }
    });
};

TidyUpAppTimer.prototype.show_score = function(){
    var items_per_minute = parseFloat(this.items_cleaned / (this.total_starting_seconds / 60)).toFixed(2);
    this.score_modal_items_per_minute.html(items_per_minute);
    var high_scores_list = new TidyUpAppHighScoreList();
    var score = new TidyUpAppScore('', items_per_minute);
    var rank = high_scores_list.compare_score(score);
    this.score_modal_rank.html(rank);
    this.score_modal.modal('show');
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
                this_ref.show_score();
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
function TidyUpAppTimer(){
    this.interval = null;
    this.minutes_el = $('#timer-minutes');
    this.seconds_el = $('#timer-seconds');
    this.total_seconds = 120;
}

TidyUpAppTimer.prototype.decrement = function(){
    this.total_seconds--;
};

TidyUpAppTimer.prototype.pause = function(){
    this.interval = null;
};

TidyUpAppTimer.prototype.refresh = function(){
    this.minutes_el.html(this.zero_pad(parseInt(this.total_seconds / 60)));
    this.seconds_el.html(this.zero_pad(this.total_seconds % 60));
};

TidyUpAppTimer.prototype.start = function(){
    var this_ref = this;
    this.interval = setInterval(function(){
        if (this_ref.total_seconds <= 0){
            this_ref.interval = null;
        } else {
            this_ref.decrement();
            this_ref.refresh();
        }
    }, 1000);
};

TidyUpAppTimer.prototype.zero_pad = function(val){
    if (val < 10){
        return '0' + val;
    } else {
    return '' + val;
    }
}
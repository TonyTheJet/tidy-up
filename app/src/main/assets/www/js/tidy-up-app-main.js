function TidyUpAppMain(){
    this.main_el = $('#main');
    this.timer = new TidyUpAppTimer();
    this.timer.start();
};

TidyUpAppMain.prototype.load = function(){
    this.main_el.removeClass('hidden');
};
function TidyUpAppMain(){
    this.main_el = $('#main');
    this.timer = null;
};

TidyUpAppMain.prototype.load = function(){
    this.main_el.removeClass('hidden');
    this.timer = new TidyUpAppTimer();
};
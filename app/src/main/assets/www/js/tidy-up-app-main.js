function TidyUpAppMain(){
    this.main_el = $('#main');
};

TidyUpAppMain.prototype.load = function(){
    this.main_el.removeClass('hidden');
};
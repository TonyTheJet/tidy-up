function TidyUpApp()
{
    this.intro = new TidyUpAppIntro();
    this.main = new TidyUpAppMain();
    this.menu = new TidyUpAppMenu();
};

TidyUpApp.prototype.init = function()
{
    this.intro.start();
    var this_intro = this.intro;
    var this_main = this.main;
    var interval = setInterval(function(){
        if (this_intro.done === true){
            clearInterval(interval);
            this_main.load();
        }
    }, 250);
};
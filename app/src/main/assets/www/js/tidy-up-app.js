function TidyUpApp()
{
    this.intro = new TidyUpAppIntro();
    this.main = new TidyUpAppMain();
};

TidyUpApp.prototype.init = function()
{
    this.intro.start();
    var this_intro = this.intro;
    var this_main = this.main;
    var interval = setInterval(function(){
        if (this_intro.done === true){
            interval = null;
            this_main.load();
        }
    }, 250);
};
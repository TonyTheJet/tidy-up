function TidyUpApp()
{
    this.intro = new TidyUpAppIntro();
};

TidyUpApp.prototype.init = function()
{
    this.intro.start();
};
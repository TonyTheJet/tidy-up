function TidyUpAppIntro()
{
    this.title_el = $('#app-title');
};


TidyUpAppIntro.prototype.animate_title = function(){
    this.title_el.animate(
        {
            top: parseInt(($(window).height() / 2) - (this.title_el.height()))
        },
        1000
    );
};

TidyUpAppIntro.prototype.start = function(){

    // animate the title
    this.animate_title();

};
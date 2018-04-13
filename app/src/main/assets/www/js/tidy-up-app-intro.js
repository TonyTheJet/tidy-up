function TidyUpAppIntro()
{
    // constants
    this.MAX_TOY_DELAY_MILLISECONDS = 400;
    this.MIN_TOY_DELAY_MILLISECONDS = 50;
    this.NUM_TOYS = 20;
    this.TOY_IMAGES = [
        'images/android-bot.png',
        'images/ballet-shoes.png',
        'images/banana-peel.png',
        'images/rubber-duck.png',
        'images/socks.png'
    ];
    // end constants

    // properties
    this.body_el = $('body');
    this.done = false;
    this.previous_toy_delay = 1000;
    this.toys = [];
    this.title_el = $('#app-title');
    this.window_height = $(window).height();
    this.window_width = $(window).width();
    // end properties
};


TidyUpAppIntro.prototype.animate_title = function(){
    var this_ref = this;
    this.title_el.animate(
        {
            top: parseInt((this.window_height / 2) - (this.title_el.height()))
        },
        1000,
        function(){
            $(this_ref.title_el).effect(
                'bounce',
                {
                    distance: 30,
                    times: 4
                },
                1500
            );
        }
    );
};

TidyUpAppIntro.prototype.drop_toy = function(toy){
    this.body_el.append(toy);
    toy.css({
        left: parseInt(Math.random() * (this.window_width))
    });
    toy.animate(
        {
            top: this.window_height - toy.height() - 67
        },
        1000,
        function(){
            toy.effect(
                'bounce',
                {
                    distance: 30,
                    times: 2
                },
                1000
            );
        }
    );
};

TidyUpAppIntro.prototype.drop_toys = function(){
    var this_ref = this;
    for (var i = 0; i < this.toys.length; i++){
        this_ref.previous_toy_delay += parseInt(Math.floor(Math.random() * (this_ref.MAX_TOY_DELAY_MILLISECONDS - this_ref.MIN_TOY_DELAY_MILLISECONDS)) + this_ref.MIN_TOY_DELAY_MILLISECONDS);

        (
            function(toy){
                setTimeout(
                    function(){
                        this_ref.drop_toy(toy)
                    },
                    this_ref.previous_toy_delay
            );
        }
        )(this_ref.toys[i]);
    }
};

TidyUpAppIntro.prototype.hide_intro_elements = function(){
    this.title_el.fadeOut(500);
    for (var i = 0; i < this.toys.length; i++){
        this.toys[i].fadeOut(500);
    }
};

TidyUpAppIntro.prototype.populate_toys = function(){
    for (var i = 0; i < this.NUM_TOYS; i++){
        var toy = this.random_toy_el(i);
        this.toys.push(toy);
    }
};

TidyUpAppIntro.prototype.random_toy_el = function(i){

    //TODO: make this actually randomize the toys
    return $('<img/>', {
        alt: 'toy element',
        class: 'falling-toy',
        src: this.TOY_IMAGES[i % this.TOY_IMAGES.length]
    });
};

TidyUpAppIntro.prototype.start = function(){

    // animate the title
    this.animate_title();

    // create the toys to drop
    this.populate_toys();

    // drop the toys
    this.drop_toys();

    // hide everything
    var this_ref = this;
    setTimeout(function(){
        this_ref.hide_intro_elements();
        this_ref.done = true;
        console.log(this_ref);
    }, 8000);

};
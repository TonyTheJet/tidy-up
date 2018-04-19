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
        'images/barbie.png',
        'images/book.png',
        'images/bouncy-ball.png',
        'images/crumpled-paper.png',
        'images/horse.png',
        'images/rubber-duck.png',
        'images/socks.png',
        'images/teddy-bear.png',
        'images/toy-car.png'
    ];
    // end constants

    // properties
    this.app_title = $('#app-title');
    this.body_el = $('body');
    this.done = false;
    this.queued_toy_drops = [];
    this.previous_toy_delay = 1000;
    this.toys = [];
    this.title_el = $('#app-title');
    this.window_height = $(window).height();
    this.window_width = $(window).width();
    // end properties

    // event handlers
    this.register_handlers();
    // end event handlers
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
            top: this.window_height - toy.height() - (Math.floor(Math.random() * (105 - 67)) + 67)
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

        if (this.done)
            break;

        this_ref.previous_toy_delay += parseInt(Math.floor(Math.random() * (this_ref.MAX_TOY_DELAY_MILLISECONDS - this_ref.MIN_TOY_DELAY_MILLISECONDS)) + this_ref.MIN_TOY_DELAY_MILLISECONDS);

        (
            function(toy){
                this_ref.queued_toy_drops.push(
                    setTimeout(
                        function(){
                            this_ref.drop_toy(toy)
                        },
                        this_ref.previous_toy_delay
                    )
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
    return $('<img/>', {
        alt: 'toy element',
        class: 'falling-toy',
        src: this.TOY_IMAGES[i % this.TOY_IMAGES.length]
    });
};

TidyUpAppIntro.prototype.register_handlers = function(){
    var this_ref = this;
    this.app_title.on('click', function(){
        this_ref.done = true;
        this_ref.tidy_up();
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
    }, 8000);

};

/**
    tidies up the loose elements for performance
*/
TidyUpAppIntro.prototype.tidy_up = function(){
    for (var i = 0; i < this.queued_toy_drops.length; i++){
        if (this.queued_toy_drops[i] != null){
            clearTimeout(this.queued_toy_drops[i])
        }
    }
    this.queued_toy_drops = [];

    for (var i = 0; i < this.toys.length; i++){
        this.toys[i].remove();
    }
    this.hide_intro_elements();
    this.toys = [];
};
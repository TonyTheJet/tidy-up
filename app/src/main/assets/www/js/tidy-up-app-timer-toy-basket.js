function TidyUpAppTimerToyBasket(){

    // "constants"
    this.BASKET_EDGE_ANGLE_DEGREES = 0.19;
    this.BASKET_IMAGE_SOURCES = [
        'images/barbie.png',
        'images/book.png',
        'images/bouncy-ball.png',
        'images/horse.png',
        'images/rubber-duck.png',
        'images/teddy-bear.png',
        'images/toy-car.png'
    ];
    this.BASKET_IMAGE_WIDTH_PCT = 0.2;
    this.BASKET_ITEM_ANGLE_LEFT_CLASS = 'angle-left';
    this.BASKET_ITEM_ANGLE_RIGHT_CLASS = 'angle-right';
    this.BASKET_ITEM_CLASS = 'basket-item';
    this.BASKET_ITEM_Z_INDEX_MAX = 89;
    this.BASKET_ITEM_Z_INDEX_MIN = 80;
    this.LEFT_PLACEMENT_ANGLED_MAX_PCT = 0.1833;
    this.LEFT_PLACEMENT_MIN_PCT = 0.0558;
    this.RIGHT_PLACEMENT_ANGLE_MIN_PCT = 0.82;
    this.RIGHT_PLACEMENT_MAX_PCT = 0.9621;
    this.TOP_POKE_OUT_MIN_PCT_BASKET_HEIGHT = 0.17;
    // end "constants"

    this.basket_el = $('#toy-basket');
    this.basket_images = [];
    this.basket_wrapper_el = $('#toy-basket-wrapper');
}

TidyUpAppTimerToyBasket.prototype.add_item = function(){
    var image = $('<img/>', {
        alt: 'toy element',
        class: this.BASKET_ITEM_CLASS,
        src: this.BASKET_IMAGE_SOURCES[this.basket_images.length % this.BASKET_IMAGE_SOURCES.length],
        width: this.basket_el.width() * this.BASKET_IMAGE_WIDTH_PCT
    });
    this.assign_random_left_style(image);
    this.assign_random_top_style(image);
    this.assign_random_zindex_style(image);
    this.add_angle_class_if_necessary(image);
    this.basket_images.push(image);
    this.basket_wrapper_el.append(image);
};

TidyUpAppTimerToyBasket.prototype.add_angle_class_if_necessary = function(image){
    var left = parseFloat(image.css('left'));
    if (left <= (this.basket_el.width() * this.LEFT_PLACEMENT_ANGLED_MAX_PCT))
        image.addClass(this.BASKET_ITEM_ANGLE_LEFT_CLASS);
    if (left >= (this.basket_el.width() * this.RIGHT_PLACEMENT_ANGLE_MIN_PCT))
        image.addClass(this.BASKET_ITEM_ANGLE_RIGHT_CLASS);
};

TidyUpAppTimerToyBasket.prototype.assign_random_left_style = function(image){
    var max = this.calculate_max_left_value_for_image(image);
    var min = this.calculate_min_left_value_for_image(image);
    image.css('left', Math.random() * (max - min) + min);
};

TidyUpAppTimerToyBasket.prototype.assign_random_top_style = function(image){
    var max = this.calculate_max_top_value_for_image(image);
    var min = this.calculate_min_top_value_for_image(image);
    image.css('top', Math.random() * (max - min) + min);
};

TidyUpAppTimerToyBasket.prototype.assign_random_zindex_style = function(image){
    image.css('zIndex', Math.floor(Math.random() * (this.BASKET_ITEM_Z_INDEX_MAX - this.BASKET_ITEM_Z_INDEX_MIN + 1) + this.BASKET_ITEM_Z_INDEX_MIN));
};

TidyUpAppTimerToyBasket.prototype.calculate_max_left_value_for_image = function(image){
    return (this.basket_el.width() * this.RIGHT_PLACEMENT_MAX_PCT) - image.width();
};

TidyUpAppTimerToyBasket.prototype.calculate_max_top_value_for_image = function(image){
    return (this.basket_el.height() * this.TOP_POKE_OUT_MIN_PCT_BASKET_HEIGHT) * -1;
};

TidyUpAppTimerToyBasket.prototype.calculate_min_left_value_for_image = function(image){
    return (this.basket_el.width() * this.LEFT_PLACEMENT_MIN_PCT);
};

TidyUpAppTimerToyBasket.prototype.calculate_min_top_value_for_image = function(image){
    return this.calculate_max_top_value_for_image(image) * (1.5 + (parseInt(this.basket_images.length / 15) * .25));
};

TidyUpAppTimerToyBasket.prototype.empty = function(){
    for (var i = 0; i < this.basket_images.length; i++){
        this.basket_images[i].remove();
    }
};
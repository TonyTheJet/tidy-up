function TidyUpAppMenu(){

     this.menu_bg_overlay = $('#background-overlay');
     this.menu_close_btn = $('#btn-close-menu');
     this.menu_new_timer_btn = $('#btn-new-timer');
     this.menu_open_btn = $('#settings-btn');
     this.menu_wrapper_el = $('#main-menu');

     this.register_handlers();
}

TidyUpAppMenu.prototype.register_handlers = function(){
    this.register_close_menu();
    this.register_open_menu();
    this.register_reload_app();
};


TidyUpAppMenu.prototype.register_close_menu = function(){
    var this_ref = this;
    this.menu_close_btn.on('click', function(e){
        this_ref.menu_wrapper_el.addClass('hidden');
        this_ref.menu_bg_overlay.addClass('hidden');
    });

    this.menu_bg_overlay.on('click', function(e){
        this_ref.menu_wrapper_el.addClass('hidden');
        this_ref.menu_bg_overlay.addClass('hidden');
    });
};

TidyUpAppMenu.prototype.register_open_menu = function(){
    var this_ref = this;
    this.menu_open_btn.on('click', function(e){
        this_ref.menu_wrapper_el.removeClass('hidden');
        this_ref.menu_bg_overlay.removeClass('hidden');
    });
};

TidyUpAppMenu.prototype.register_reload_app = function(){
    this.menu_new_timer_btn.on('click', function(){
        navigator.app.loadUrl('file:///android_asset/www/index.html');
    });
};
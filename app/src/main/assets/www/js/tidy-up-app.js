function TidyUpApp()
{

    // "constants"
    this.NUM_HIGH_SCORES_TO_DISPLAY = 20;
    // end "constants"

    this.cha_ching_sound = new Audio('audio/cha-ching.mp3');
    this.click_sound = new Audio('audio/click.ogg');
    this.high_scores_app_modal_body = $('#high-scores-app-modal-body');
    this.high_scores_list = new TidyUpAppHighScoreList();
    this.high_scores_menu_item = $('#btn-high-scores');
    this.intro = new TidyUpAppIntro();
    this.main = new TidyUpAppMain();
    this.menu = new TidyUpAppMenu();
    this.save_score_btn = $('#save-score');
    this.score_items_per_minute = $('#score-info-modal-items-per-minute');
    this.score_name_input = $('#score-name');
    this.timer_selection_buttons = $('.select-time-btn');
    this.timer_selection_wrapper = $('#timer-selection-wrapper');

    this.register_handlers();

};

TidyUpApp.prototype.hide_selection_screen = function(){
    this.timer_selection_wrapper.addClass('hidden');
};

TidyUpApp.prototype.init = function()
{
    this.intro.start();
    var this_intro = this.intro;
    var this_main = this.main;
    var this_ref = this;
    var interval = setInterval(function(){
        if (this_intro.done === true){
            clearInterval(interval);
            this_main.load();
            this_ref.show_selection_screen();
        }
    }, 100);
};

TidyUpApp.prototype.load_high_scores_table = function(){

    // show that we are loading the high scores...
    this.high_scores_app_modal_body.html('<span id="loading-high-scores"><img src="images/comet-spinner.gif" alt="..." />Loading high scores...</span>');

    // build the string out
    var table = '<table class="table table-bordered table-responsive table-striped"><thead><tr><th class="text-center">Name</th><th class="text-center">Items Per Minute</th></tr></thead><tbody>';
    console.log(this.high_scores_list.scores);
    for (var i = 0; i < this.high_scores_list.scores.length; i++){
        if (i < this.NUM_HIGH_SCORES_TO_DISPLAY){
            table += '<tr><td>' + this.high_scores_list.scores[i].name + '</td><td class="text-right">' + this.high_scores_list.scores[i].items_per_minute.toFixed(2) + '</td>';
        } else {
            break;
        }
    }
    table += '</tbody></table>';
    this.high_scores_app_modal_body.html(table);
};

TidyUpApp.prototype.register_handlers = function(){
    this.register_high_scores_menu_click();
    this.register_new_timer_click();
    this.register_save_score_click();
    this.register_timer_selection_click();
};

TidyUpApp.prototype.register_high_scores_menu_click = function(){
    var this_ref = this;
    this.high_scores_menu_item.on('click', function(){
        this_ref.load_high_scores_table();
    });
};


TidyUpApp.prototype.register_new_timer_click = function(){
    var this_ref = this;
    this.menu.menu_new_timer_btn.on('click', function(){
        if (this_ref.main.timer !== null){
            this_ref.main.timer.destroy();
        }
        this_ref.show_selection_screen();
    });
};

TidyUpApp.prototype.register_save_score_click = function(){
    var this_ref = this;
    this.save_score_btn.on('click', function(){
        this_ref.save_score();
    });
};

TidyUpApp.prototype.register_timer_selection_click = function(){
    var this_ref = this;
    this.timer_selection_buttons.on('click', function(){
        this_ref.hide_selection_screen();
        this_ref.menu.close();
        this_ref.click_sound.play();

        if (this_ref.main.timer && this_ref.main.timer.interval){
            this_ref.main.timer.destroy();
        }
        this_ref.main.timer = new TidyUpAppTimer();
        this_ref.main.timer.total_seconds = $(this).data('seconds');
        this_ref.main.timer.total_starting_seconds = this_ref.main.timer.total_seconds;
        this_ref.main.timer.refresh();
    });
};

TidyUpApp.prototype.save_score = function(){
    var name = this.score_name_input.val();
    if ($.trim(name) == ''){
        name = '(anon)';
    }
    var score = new TidyUpAppScore(name, parseFloat(this.score_items_per_minute.text()));
    this.high_scores_list.save_score(score);
    this.cha_ching_sound.play();
};

TidyUpApp.prototype.show_selection_screen = function(){
    this.timer_selection_wrapper.removeClass('hidden');
};
function TidyUpAppHighScoreList(){

    // "constants"
    this.LOCAL_STORAGE_ID = 'TIDY_UP_APP_HIGH_SCORES_LIST';
    // end "constants"

    this.scores = [];
    this.load();
}


TidyUpAppHighScoreList.prototype.compare_score = function(score){
    var place = this.scores.length + 1;
    if (score instanceof TidyUpAppScore){
        for (var i = 0; i < this.scores.length; i++){
            if (score.items_per_minute > this.scores[i].items_per_minute){
                place = (i + 1);
                break;
            }
        }
    }

   return place;
};

TidyUpAppHighScoreList.prototype.load = function(){
    var storage_data = localStorage.getItem(this.LOCAL_STORAGE_ID);
    if (storage_data){
        this.scores = JSON.parse(storage_data);
    }
};

TidyUpAppHighScoreList.prototype.save = function(){
    localStorage.setItem(this.LOCAL_STORAGE_ID, JSON.stringify(this.scores));
};

TidyUpAppHighScoreList.prototype.save_score = function(score){
    if (score instanceof TidyUpAppScore){
        this.scores.push(score);
        this.scores.sort(
            function(obj1, obj2){
                return obj2.items_per_minute - obj1.items_per_minute;
            }
        );
        this.save();

        return true;
    } else {
        return false;
    }
};


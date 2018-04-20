function TidyUpAppScore(name, items_per_minute){
    this.id = this.generate_id(name + items_per_minute + new Date().getTime());
    this.name = name;
    this.items_per_minute = items_per_minute;
}

TidyUpAppScore.prototype.generate_id = function(string){
    var hash = 0;
    if (string.length == 0) {
        return hash;
    }
    for (var i = 0; i < string.length; i++) {
        var char = string.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }

    return hash;
};
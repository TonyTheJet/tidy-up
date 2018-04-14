$(
    function()
    {
        var app = new TidyUpApp();
        app.init();

        // open menu
        $('#settings-btn').on('click', function(){
            $('#main-menu').removeClass('hidden');
        });

        // close menu
        $('#btn-close-menu').on('click', function(){
            $('#main-menu').addClass('hidden');
        });
    }
);
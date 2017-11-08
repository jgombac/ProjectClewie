
var estimatorManager = (function () {

    var init = function (context) {
        initSlider(context);
        initForms(context);     
    }

    var initForms = function (context) {
        $(context).on("submit", "#init, #predict", function (e) {
            var data = {};
            $(this).find(':input').each(function () {
                data[$(this).attr("name")] = $(this).val();
            });
            gom.clew.create("{{request.path}}", data)
                .done(function (response) {
                    console.log(response);
                })
                .fail(function () {
                    console.log("fail create");
                });
            return false;
        });


        //var fileManager = new FileManager($("[data-gom-action='train']"));
        // $(context).on("submit", "#file-form", function (e) {
        //     e.preventDefault();
        //     form = new FormData($(this)[0])
        //     gom.clew.fileUpload(form)
        //         .done(function (response) {
        //             $(".js-fileInspector").html(response);
        //             var mng = new FileManager($(".js-fileInspector"));
        //             mng.showOptions();
        //             $(window).trigger('resize');
        //         })
        //         .fail(function (error) {
        //             console.log("error", error);
        //         });
        // });
    }

    var initSlider = function (context) {
        $(".slick-slider", context).slick({
            speed: 200,
            arrows: false,
            adaptiveHeight: true,
            draggable: false,
            infinite: false,
        });

        //test
        $(".action-slider", $("#regressor-editor")).slick("slickGoTo", 1);

        $(".slider-item[value='0']", context).addClass("active");
        $(".slider-item", context).click(function () {
            $(".action-slider", context).slick("slickGoTo", $(this).val());
            $(".slider-item", context).removeClass("active");
            $(this).addClass("active");
        });
    }


    return {

        init: init,
    }
})();

var estimatorManager = (function () {

    est_id = "";
    _self = null;

    var init = function (context, id) {
        _self = this
        _self.est_id = id;
        initSlider(context);
        initForms(context);     
        initFormHandler(context);
    };

    var initialize = function () {
        data = {
            "est_id": _self.est_id,
            "action": "init",
        }

        gom.clew.manageEstimator(data)
        .done(function (response) {
            console.log(response);
        })
        .fail(function (error) {

        });

    };

    var train = function () {

    };

    var predict = function () {

    };

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

    var initFormHandler = function (context) {
        $("[data-gom-form='submit']", context).on("click", function () {
            var action = $(this).closest("[data-gom-action]").attr("data-gom-action");
            if (action == "init") {
                initialize();
            }
        });
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
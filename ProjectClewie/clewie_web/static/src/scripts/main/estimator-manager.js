
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

        $(context).on("submit", "#file-form", function (e) {
            e.preventDefault();
            form = new FormData($(this)[0])
            gom.clew.fileUpload(form)
                .done(function (response) {
                    console.log(response);
                })
                .fail(function (error) {
                    console.log(error);
                });
        });
    }

    var initSlider = function (context) {
        $(".slick-slider", context).slick({
            speed: 200,
            arrows: false,
            adaptiveHeight: true,
        });

        resetSlideHeight(context);
        $(window).resize(function () {
            resetSlideHeight(context);
        })
        $(".slider-item[value='0']", context).addClass("active");
        $(".slider-item", context).click(function () {
            $(".action-slider", context).slick("slickGoTo", $(this).val());
            $(".slider-item", context).removeClass("active");
            $(this).addClass("active");
        });
    }

    var resetSlideHeight = function (context) {
        var maxHeight = -1;
        $('.slick-slide', context).each(function () {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).height();
            }
        });
        $('.slick-slide', context).each(function () {
            if ($(this).height() < maxHeight) {
                $(this).css('margin', Math.ceil((maxHeight - $(this).height()) / 2) + 'px 0');
            }
        });
    }

    return {

        init: init,
    }
})();
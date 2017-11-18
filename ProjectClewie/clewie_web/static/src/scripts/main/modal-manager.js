var modalManager = (function (){


    var modals = {};

    var init = function () {

        $("body").on("click", "[data-gom-trigger='modal']", function (e) {
            e.preventDefault();
            openModal($(this).attr("data-gom-modal"), $(this).attr("data-gom-modalid"));
        });

    };

    var checkIfModalOpened = function (name, id) {
        return modals[name + id] != undefined;
    };

    var openModal = function (name, id) {
        if (checkIfModalOpened(name, id)){
            modals[name + id].open();
        }
        else {
            var modal = new tingle.modal({
                cssClass: [name + id],
            });

            modal.setContent(window.modals[name]);
            appendManager(name, id);
            modal.open();
            modals[name + id] = modal;
        }
    };

    var appendManager = function (name, id) {
        if (name == "fileManager") {
            new FileManager($("." + name + id));
        }
    }

    return {
        init: init,
        modals: modals,
    }
})();

modalManager.init();
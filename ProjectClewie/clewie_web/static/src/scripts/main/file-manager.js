function FileManager(context){    
    this.context = context;
    this.file = null;
    this.delimiter = ",";
    this.floatPercision = null;
    this.useCols = "";
    this.typeOptions = ["Numeric", "Boolean", "Nominal"];
    this.roleOptions = ["Feature", "Label"];

    this.types = [];
    this.roles = [];
    var _this = this;

    this.processFile = function () {
        
    };

    this.collectOptions = function () {
        _this.types = [];
        _this.roles = [];
        $("[data-gom-select='type']", _this.context).each(function () {
            _this.types.push($(this).find("option:selected").val());
        });
        $("[data-gom-select='role']", _this.context).each(function () {
            _this.roles.push($(this).find("option:selected").val());
        });
    };

    this.showOptions = function () {
        _this.showTypes();
        _this.showRoles();
    };  

    this.showTypes = function () {
        $("tbody", context).append($("<tr class='types'>"))

        $("tbody tr").eq(-2).find("td").each(function () {
            $(".types").append("<td class='type-container'>");
        });

        $(".type-container").append($("<select data-gom-select='type' dir='rtl'>"));
        _this.typeOptions.forEach(function (v) {
            $("[data-gom-select='type']").each(function () {             
                $(this).append($("<option>").text(v).attr("value", v.toLowerCase()));   
            });            
        });     
    };

    this.showRoles = function () {
        $("tbody", context).append($("<tr class='roles'>"))
        
        $("tbody tr").eq(-3).find("td").each(function () {
            $(".roles").append("<td class='role-container'>");
        });

        $(".role-container").append($("<select data-gom-select='role' dir='rtl'>"));
        _this.roleOptions.forEach(function (v) {
            $("[data-gom-select='role']").each(function () {             
                $(this).append($("<option>").text(v).attr("value", v.toLowerCase()));   
            });            
        });     
    };


    (function () {
        $(context).on("change", "[data-gom-select]", function () {
            _this.collectOptions();
        });

        $(context).on("submit", ".file-form", function (e) {
            e.preventDefault();
            var form = new FormData($(this)[0]);

                form.append("roles", _this.roles);
                form.append("types", _this.types);
            
            gom.clew.fileUpload(form)
            .done(function (response) {
                $(".js-fileInspector", context).html(response);
                _this.showOptions();
                $(window).trigger('resize');
            })
            .fail(function (error) {
                console.log("error", error);
            });
        })
    })();
}

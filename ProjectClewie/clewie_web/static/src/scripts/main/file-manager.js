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

    this.locked = false;

    var _this = this;

    this.processFile = function () {
        
    };

    this.upload = function () {

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

    this.showOptions = function (data) {
        _this.showTypes(data);
        _this.showRoles(data);
    };  

    this.showTypes = function (data) {
        $("tbody", context).append($("<tr class='types'>"))

        $("tbody tr").eq(-2).find("td").each(function () {
            $(".types").append("<td class='type-container'>");
        });

        $(".type-container").append($("<select data-gom-select='type' dir='rtl'>"));
        _this.typeOptions.forEach(function (v) {
            $("[data-gom-select='type']").each(function (i, val) {  
                if(data.types != undefined && data.types[i] == v.toLowerCase())           
                    $(this).append($("<option>").text(v).attr("value", v.toLowerCase()).attr("selected", true));   
                else
                    $(this).append($("<option>").text(v).attr("value", v.toLowerCase()));   
                
            });            
        });     
    };

    this.showRoles = function (data) {
        $("tbody", context).append($("<tr class='roles'>"))
        
        $("tbody tr").eq(-3).find("td").each(function () {
            $(".roles").append("<td class='role-container'>");
        });

        $(".role-container").append($("<select data-gom-select='role' dir='rtl'>"));
        _this.roleOptions.forEach(function (v) {
            $("[data-gom-select='role']").each(function (i, val) {             
                if(data.roles != undefined && data.roles[i] == v.toLowerCase())           
                     $(this).append($("<option>").text(v).attr("value", v.toLowerCase()).attr("selected", true));   
                else
                    $(this).append($("<option>").text(v).attr("value", v.toLowerCase()));   
        });            
        });     
    };


    (function () {
        $(context).on("change", "[data-gom-select]", function () {
            _this.collectOptions();
        });

        $(context).on("click", "[data-gom-file]", function (){
            $("[data-gom-file]", context).removeAttr("clicked");
            $(this).attr("clicked", "true");

        });

        $(context).on("submit", ".file-form", function (e) {
            e.preventDefault();
            console.log($("[clicked='true']", context).attr("data-gom-file"));
            var form = new FormData($(this)[0]);

            form.append("roles", _this.roles);
            form.append("types", _this.types);
            
            gom.clew.fileUpload(form)
            .done(function (response) {
                $(".js-fileParams", context).html(response.table);
                _this.showOptions(response);
                $(window).trigger('resize');
            })
            .fail(function (error) {
                console.log("error", error);
            });
        })
    })();
}

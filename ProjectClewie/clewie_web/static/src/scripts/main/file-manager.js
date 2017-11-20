function FileManager(context){    
    this.context = context;
    this.file = null;
    this.delimiter = ",";
    this.floatPercision = null;
    this.useCols = "";
    this.typeOptions = ["Numeric", "Boolean", "Nominal"];
    this.roleOptions = ["Feature", "Label"];
    this.id = "";

    this.types = [];
    this.roles = [];

    this.locked = false;

    var _this = this;


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

    this.showOptions = function (data, container) {
        _this.showTypes(data, container);
        _this.showRoles(data, container);
    };  

    this.showTypes = function (data, container) {
        $(container + " tbody", context).append($("<tr class='types'>"));

        $(container + " tbody tr", context).eq(-2).find("td").each(function () {
            $(container + " .types", context).append("<td class='type-container'>");
        });

        if (container == ".js-fileProcessed"){
            $(container + " .type-container", context).each( function (i, v) {
                $(this).append(data.types[i]);
            });

        }
        else if (container == ".js-fileParams"){
            $(container + " .type-container", context).append($("<select data-gom-select='type' dir='rtl'>"));
            _this.typeOptions.forEach(function (v) {
                $(container + " [data-gom-select='type']").each(function (i, val) {  
                    if(data.types != undefined && data.types[i] == v.toLowerCase()) 
                        $(this).append($("<option>").text(v).attr("value", v.toLowerCase()).attr("selected", true));   
                    else
                        $(this).append($("<option>").text(v).attr("value", v.toLowerCase()));                    
                });            
            });     
        }
    };

    this.showRoles = function (data, container) {
        $(container + " tbody", context).append($("<tr class='roles'>"));
        
        $(container + " tbody tr", context).eq(-3).find("td").each(function () {
            $(container + " .roles", context).append("<td class='role-container'>");
        });

        $(container + " .role-container").append($("<select data-gom-select='role' dir='rtl'>"));
        _this.roleOptions.forEach(function (v) {
            $(container + " [data-gom-select='role']", context).each(function (i, val) {             
                if(data.roles != undefined && data.roles[i] == v.toLowerCase())           
                     $(this).append($("<option>").text(v).attr("value", v.toLowerCase()).attr("selected", true));   
                else
                    $(this).append($("<option>").text(v).attr("value", v.toLowerCase()));   
            });            
        });     
    };


    (function () {
        _this.id = $(_this.context)[0].classList[1];
        console.log(_this.id);
        $(_this.context).on("change", "[data-gom-select]", function () {
            _this.collectOptions();
        });

        $(_this.context).on("click", "[data-gom-file]", function (){
            $("[data-gom-file]", context).removeAttr("clicked");
            $(this).attr("clicked", "true");

        });

        $(_this.context).on("submit", ".file-form", function (e) {
            e.preventDefault();
            console.log("submitted");
            _this.collectOptions();
            var form = new FormData($(this)[0]);

            form.append("action", $("[clicked='true']", context).attr("data-gom-file"));
            form.append("roles", _this.roles);
            form.append("types", _this.types);
            form.append("file_id", _this.id);
            
            gom.clew.fileUpload(form)
            .done(function (response) {
                if (response.action == "upload"){
                    $(".js-fileParams", context).html(response.table);
                    _this.showOptions(response, ".js-fileParams");
                }
                else if (response.action == "process"){
                    $(".js-fileProcessed", context).html(response.table);
                    _this.showOptions(response, ".js-fileProcessed");
                }
                
                $(window).trigger('resize');
            })
            .fail(function (error) {
                console.log("error", error);
            });
        })
    })();
}


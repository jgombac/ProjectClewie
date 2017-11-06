var gom = gom || {};

gom.clew = {
    call: function (type, url, data) {
        return $.ajax({
            type: type,
            url: url,
            contentType: "application/json",
            dataType: "json",
            data: data != null ? JSON.stringify(data) : "",
            async: true,
            cache: false,
        });
    },

    fileUpload: function (data) {
        return $.ajax({
            type: "POST",
            url: "/fileupload/",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "html",
            async: true,
            cache: false,
        });
    },

    create: function (url, data) {
        return gom.clew.call("POST", url, data);
    },
    
}
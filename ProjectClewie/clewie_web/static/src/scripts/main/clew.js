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
            dataType: "json",
            type: "POST",
            url: "/fileupload/",
            data: data,
            cache: false,
            contentType: false,
            processData: false,   
            async: true,
            cache: false,
        });
    },

    manageEstimator: function(data) {
        return gom.clew.call("POST", "/manage/regressor/", data);
    },

    create: function (url, data) {
        return gom.clew.call("POST", url, data);
    },
    
}
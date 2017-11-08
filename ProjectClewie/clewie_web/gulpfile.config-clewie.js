module.exports = () => {

    const path_general = __dirname + "/static";
    const path_build_scripts = path_general + "/build/scripts/";
    const path_source_scripts = path_general + "/src/scripts/";

    const config = {
        "styles": {
            "build": path_general + "/build/styles/",
            "source": path_general + "/src/styles/*-clewie.scss",
            "sourcefolder": path_general + "/src/styles/",
        },

        "images": path_general + "/assets/images/",

        "browsersupport": ["IE >= 10", "last 3 versions", "iOS >= 8"],

        "scriptsbuild": path_build_scripts,
        "scriptssource": [
            path_source_scripts + "**/*.js",
        ],

        "scripts": [
            {
                "build": "libs.js",
                "source": [
                    path_source_scripts + "libs/jquery-3.2.1.min.js",
                    path_source_scripts + "libs/slick.min.js",
                    path_source_scripts + "libs/tingle.js",
                ]
            },
            {
                "build": "main.js",
                "source": [
                    path_source_scripts + "main/topbar.js",
                    path_source_scripts + "main/init.js",
                    path_source_scripts + "main/estimator-manager.js",
                    path_source_scripts + "main/file-manager.js",
                    path_source_scripts + "main/tests.js",
                    path_source_scripts + "main/clew.js",
                ]
            },

        ]
    }
    return config;
}
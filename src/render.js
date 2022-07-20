
mustache = require([process.cwd(), 'node_modules', 'mustache'].join('/'));
fs = require('fs');
fs.readFile('src/template_mustache.html', 'utf8', function (err, dataTemplate) {
    if (err) {
        return console.log(err);
    }

    fs.readFile('src/data.json', 'utf8', function (err, dataJsonStr) {
        if (err) {
            return console.log(err);
        }
        var dataJson = JSON.parse(dataJsonStr);

        fs.readFile('src/companies/eteration.html', 'utf8', function (err, eterationHtml) {
            if (err) {
                return console.log(err);
            }

            fs.readFile('src/companies/asseco.html', 'utf8', function (err, assecoHtml) {
                if (err) {
                    return console.log(err);
                }

                fs.readFile('src/companies/etiya.html', 'utf8', function (err, etiyaHtml) {
                    if (err) {
                        return console.log(err);
                    }

                    fs.readFile('src/main.css', 'utf8', function (err, mainCss) {
                        if (err) {
                            return console.log(err);
                        }

                        dataJson.mainCss = mainCss;

                        dataJson.companyList[0].longInfo = etiyaHtml;
                        dataJson.companyList[1].longInfo = assecoHtml;
                        dataJson.companyList[2].longInfo = eterationHtml;

                        mustache.escape = function (text) { return text; };
                        var rendered = mustache.render(dataTemplate, dataJson);

                        fs.writeFile('index.html', rendered, function (err) {
                            if (err) return console.log(err);
                        });
                    });
                });
            });
        });
    });
});

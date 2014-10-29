var page = require('webpage').create();
page.viewportSize = { width: 1920, height: 1080 };
page.open('http://www.traveloka.com/fullsearch?ap=SOC.CGK&dt=30-10-2014.NA&ps=1.0.0', function() {
    page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
        var fs = require('fs');
        var dom = page.evaluate(function() {
            var outa
            var panjang = $('.flightResultGenerated').length;
            var nao = [];
            var nanana = [];
            for (var i = 0; i < panjang; i++) {
                var jsona = {
                    isi: ""
                };
                var dat = $('.flightResultGenerated')[i];
                outa = dat['outerText'];
                jsona.isi = dat['outerText'];
                nanana[i] = jsona;
                nao[i] = outa;
            }
            return nanana;
        });

        function dump(obj) {
            var out = '';
            for (var i in obj) {
                out += i + ": " + obj[i] + "\n";
            }
            console.log(out);
        }


        dump(dom);
        var data = {
            body: dom
        };
        var path = 'output.json';
        var content = JSON.stringify(data, null, 4);
        fs.write(path, content, 'w');

        page.render('output.png');
        phantom.exit();
    });
});
var page = require('webpage').create();
page.viewportSize = {
    width: 1920,
    height: 1080
};

//cek finished or not
page.onLoadFinished = function(status) {
    console.log('Status: ' + status);
};

page.open('http://www.tiket.com/search/flight?d=SOC&a=CGK&date=2014-11-06&ret_date=&adult=1&child=0&infant=0&uid=', function() {
    page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {

        var fs = require('fs');

        //main function scraping
        var dom = page.evaluate(function() {
            var outa
            var panjang = $('.flight-rows').length;
            var nao = [];
            var nanana = [];
            for (var i = 0; i < panjang; i++) {
                var jsona = {
                    isi: ""
                };
                var dat = $('.flight-rows')[i];
                outa = dat['outerText'];
                jsona.isi = dat['outerText'];
                nanana[i] = jsona;
                nao[i] = outa;
            }
            return nanana;
        });

        //function dom for duping the object
        function dump(obj) {
            var out = '';
            for (var i in obj) {
                out += i + ": " + obj[i] + "\n";
            }
            console.log(out);
        }

        //dump dom print to console
        dump(dom);

        //create json data
        var data = {
            body: dom
        };

        //print data to file
        var path = 'outputtiket.json';
        var content = JSON.stringify(data, null, 4);
        fs.write(path, content, 'w');

        //try to render the page
        page.render('outputtiket.png');
        console.log('lihat pada directori')
        phantom.exit();
    });
});

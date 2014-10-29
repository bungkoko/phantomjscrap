var page2 = require('webpage').create();
page2.viewportSize = {
    width: 1920,
    height: 1080
};

//cek finished or not
page2.onLoadFinished = function(status) {
    console.log('Status: ' + status);
};

page2.open('http://www.traveloka.com/fullsearch?ap=SOC.CGK&dt=05-11-2014.NA&ps=1.0.0', function() {
    page2.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {

        var fs = require('fs');

        //main function scraping
        var dom = page2.evaluate(function() {
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
        var path = 'outputtravel.json';
        var content = JSON.stringify(data, null, 4);
        fs.write(path, content, 'w');

        //try to render the page
        page2.render('outputtravel.png');
        console.log('lihat pada directori')
        phantom.exit();
    });
});
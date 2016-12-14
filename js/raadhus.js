/****************** FUNKTIONER ************************/
function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Funktion til at zoome til et bestemt værelses-nummer.
function zoomFromRoomNumber(roomno,themap,datasource) {
    datasource = datasource || 'numre_raadhus.geojson';
    $.get(datasource, function(data) {
        jQuery.each(data['features'], function(index, value) {
            if(this['properties']['rum_nr']===rum_nr) { 
                var coords = [this['geometry']['coordinates'][1],this['geometry']['coordinates'][0]];
                L.marker(coords).addTo(themap);
                themap.setView(coords,21);
            };
        });
    });
}
function populateRoomNumbers(rum_nr, datasource,selectid) {
    datasource = datasource || 'numre_raadhus.geojson';
    selectid=selectid || '#numre';
    
    $.get(datasource, function(data) {
        var numre = new Array();
        var i = 0;

        // Kommer an på webserveropsætning. Hvis det er sat rigtigt op, kommer JSON-data ind som et 
        // objekt. Ellers konverteres fra string til objekt (vha jQuery)
        if ((typeof data) == 'string') data = jQuery.parseJSON(data);

        $.each(data['features'], function(index, value) {
            numre[i] = this['properties']['rum_nr'];
            i++;
        });
        numre.sort(function(a,b){return a-b});
        $.each(numre, function(index, value) {
            if(rum_nr===value) {
                $(selectid).append($('<option>', {value: value,selected:'selected'}).text(value));
            } else {
                $(selectid).append($('<option>', {value: value}).text(value));
            }
        });
    });        
}

function populateSale(sal,data,selectid) {
    sal = sal || null;
    data = data || [{'key' : '5', 'text' : '5. sal'},{'key' : '4', 'text' : '4. sal'},{'key' : '3', 'text' : '3. sal'},{'key' : '2', 'text' : '2. sal'},{'key' : '1', 'text' : '1. sal'},{'key' : '0', 'text' : 'Stuen'},{'key' : '00', 'text' : 'Kælderen'}];
    selectid=selectid || '#input-sale';
    $.each(data,function(key,value) {
        if(sal===this['key']) {
            $('#input-sal').append($('<option>', {value: this['key'], selected: 'selected'}).text(this['text']));
        } else {
            $('#input-sal').append($('<option>', {value: this['key']}).text(this['text']));
        }
    });
};



var scale = new L.control.scale({
            imperial: false,
            maxWidth: '100'
           });

var orto2013f_raadhus = new L.tileLayer('http://54.229.79.223/v2/Orto_raadhus/{z}/{x}/{y}.png', {
    tms: false,
    maxZoom: 21,
    minZoom: 18,
    zIndex: -20,
    attribution: 'Luftfoto &copy Frederiksberg Kommune'
});         		

var raadhus_00 = new L.tileLayer('http://54.229.79.223/v2/raadhus_00/{z}/{x}/{y}.png', {
    tms: false,
    maxZoom: 22,
    minZoom: 19,
    zIndex: 4,
});
var raadhus_0 = new L.tileLayer('http://54.229.79.223/v2/raadhus_0/{z}/{x}/{y}.png', {
    tms: false,
    maxZoom: 22,
    minZoom: 19,
    zIndex: 4
});
    var raadhus_1 = new L.tileLayer('http://54.229.79.223/v2/raadhus_1/{z}/{x}/{y}.png', {
    tms: false,
    maxZoom: 22,
    minZoom: 19,
    zIndex: 4
});

var raadhus_2 = new L.tileLayer('http://54.229.79.223/v2/raadhus_2/{z}/{x}/{y}.png', {
    tms: false,
    maxZoom: 22,
    minZoom: 19,
    zIndex: 4
});
var raadhus_3 = new L.tileLayer('http://54.229.79.223/v2/raadhus_3/{z}/{x}/{y}.png', {
    tms: false,
    maxZoom: 22,
    minZoom: 19,
    zIndex: 4
});
var raadhus_4 = new L.tileLayer('http://54.229.79.223/v2/raadhus_4/{z}/{x}/{y}.png', {
    tms: false,
    maxZoom: 22,
    minZoom: 19,
    zIndex: 4
});
var raadhus_5 = new L.tileLayer('http://54.229.79.223/v2/raadhus_5/{z}/{x}/{y}.png', {
    tms: false,
    maxZoom: 22,
    minZoom: 19,
    zIndex: 4
});

/*var imageUrl = 'data/raadhus_etager/4sal.png',
    imageBounds = [[55.678652,12.530381], [55.6779,12.532052]];

L.imageOverlay(imageUrl, imageBounds).addTo(map);*/



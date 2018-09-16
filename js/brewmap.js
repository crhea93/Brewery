

function BrewMap(barrels,FedTax){
    Plotly.d3.csv('https://raw.githubusercontent.com/crhea93/Brewery/gh-pages/StateTaxes.csv', function (err, rows) {

        function unpack(rows, key) {
            return rows.map(function (row) {
                return row[key];
            });
        }



        var taxes = unpack(rows, 'Taxes');
        var fed_bool = FedTax.options[FedTax.selectedIndex].value;
        if (fed_bool !== '1') {
            for (i = 0; i < taxes.length; i++) {
                taxes[i] = taxes[i]*barrels + 3 * barrels;
            }
        } else {
            for (i = 0; i < taxes.length; i++) {
                taxes[i] = taxes[i] * barrels;
            }
        }
        var data = [{
            type: 'choropleth',
            locationmode: 'USA-states',
            locations: unpack(rows, 'code'),
            z: taxes,
            text: unpack(rows, 'state'),
            zmin: 0,
            zmax: Math.max(taxes)+100,
            colorscale: [
                [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
                [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
                [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
            ],
            colorbar: {
                title: 'Taxes per Barrel (USD)',
                thickness: 0.2
            },
            marker: {
                line: {
                    color: 'rgb(255,255,255)',
                    width: 2
                }
            }
        }];


        var layout = {
            title: '2018 State Tax For Beers per Barrel (UPDATED)',
            geo: {
                scope: 'usa',
                showlakes: true,
                lakecolor: 'rgb(255,255,255)'
            }
        };

        Plotly.newPlot("brewtaxmap", data, layout, {showLink: false});
    });
}
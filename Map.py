'''
Create map
'''
import plotly.offline as py
import pandas as pd

df = pd.read_table('StateTaxes.txt', delim_whitespace=True, names=('State','TaxRate'))
for col in df.columns:
    df[col] = df[col].astype(str)
scl = [[0.0, 'rgb(242,240,247)'],[0.2, 'rgb(218,218,235)'],[0.4, 'rgb(188,189,220)'],\
            [0.6, 'rgb(158,154,200)'],[0.8, 'rgb(117,107,177)'],[1.0, 'rgb(84,39,143)']]



#Set Text to plot
df['text'] = df['State'] + '<br>' +'Tax Rate '+df['TaxRate']


#plotting
data = [ dict(
        type='choropleth',
        colorscale = scl,
        autocolorscale = False,
        locations = df['State'],
        z = df['TaxRate'].astype(float),
        locationmode = 'USA-states',
        text = df['text'],
        marker = dict(
            line = dict (
                color = 'rgb(255,255,255)',
                width = 2
            ) ),
        colorbar = dict(
            title = "State Tax Rate")
        ) ]

layout = dict(
        title = '2018 State and Federal Beer Tax by State<br>(Hover for breakdown)',
        geo = dict(
            scope='usa',
            projection=dict( type='albers usa' ),
            showlakes = True,
            lakecolor = 'rgb(255, 255, 255)'),
             )

fig = dict( data=data, layout=layout )
py.offline.plot( fig, filename='d3-cloropleth-map.html' )

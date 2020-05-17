import * as React from 'react';
import { IBingMapProps } from './IBingMapProps';
import * as jquery from 'jquery';
import { ReactBingmaps } from 'react-bingmaps-plus';

export interface IGetItemsAndMapInfoBoxesState{    
  items:[    
        {    
          "Title": "",    
          "Hours": "",    
          "GeoLoc": {
            "Latitude": "",
            "Longitude": "",
          },
        }];  
mapInfoBoxes:[    
          {    
            location: ["",""],    
            addHandler: "",    
            pushPinOption: {color: ""},
            infoboxOption: {
              title: "",
              description: "",
            },
          }];   
}  

export interface IBingMapInfoBoxProps{}

export default class BingMap extends React.Component<IBingMapProps, IGetItemsAndMapInfoBoxesState> {
  
  public constructor(props: IBingMapProps, state: IGetItemsAndMapInfoBoxesState){    
    super(props);    
    this.state = {    
      items: [    
        {    
          "Title": "",    
          "Hours": "", 
          "GeoLoc": {
            "Latitude": "",
            "Longitude": "",
          },          
        }    
      ],
      mapInfoBoxes: [
        {
          location: ["",""],    
          addHandler: "",    
          pushPinOption: {color: ""},
          infoboxOption: {
              title: "",
              description: "",
           },   
        }
      ]
    };    
  }
  
  public componentDidMount(){    
    var reactHandler = this;    
    jquery.ajax({    
        url: `${this.props.siteurl}/_api/web/lists/getbytitle('Locations')/items`,    
        type: "GET",    
        headers:{'Accept': 'application/json; odata=verbose;'},    
        success: (listData) => {
          const arrMapInfoBox: any = this.getMapInfoBoxes(listData.d.results);
          reactHandler.setState({    
            items: listData.d.results,
            mapInfoBoxes: arrMapInfoBox,            
          });    
        },    
        error : (jqXHR, textStatus, errorThrown) => {    
        }    
    });    
  }

  private getMapInfoBoxes = (listItems) => {
    let arrInfoBox = [];
    for (var i = 0; i < listItems.length; i++) {    
      const latitude =   listItems[i].GeoLoc.Latitude;
      const longitude =  listItems[i].GeoLoc.Longitude;
      arrInfoBox.push({
          location: [latitude,longitude],
          addHandler: "click",
          infoboxOption: {title: listItems[i].Title, description: listItems[i].DispName + "<br/>" + listItems[i].Hours},
          pushPinOption: {color: "red" },
      });
  }
  return arrInfoBox;
  }
  
  
  public render(): React.ReactElement<IBingMapProps> {    
  const arrInfoBoxesWithPushpins = this.state.mapInfoBoxes;   
 
  if(arrInfoBoxesWithPushpins.length > 1)
  {
    return (    
            <div>
                <h2> CHICAGOLAND COVID-19 Testing Centers  </h2>  
                <h3> Location Details</h3>
                <ReactBingmaps
                  bingmapKey="AuvXt39opLe7v4VkdAygVqCS0xqpM4i7oVNxpKu7zQNX9SbNKprnbXNKSUFgjz59"
                  center={["41.878113","-87.629799"]}
                  mapTypeId={"road"}
                  zoom={13}                    
                  infoboxesWithPushPins = {arrInfoBoxesWithPushpins}                        
                  >
                  </ReactBingmaps> 
            </div>          
          );
    }
  else
      { return (<div>map is loading...</div>);}
  }

}

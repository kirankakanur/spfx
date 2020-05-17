import * as React from 'react';
import styles from './BingMap.module.scss';
import { IBingMapProps } from './IBingMapProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from 'jquery';
import { ReactBingmaps } from 'react-bingmaps-plus';

export interface IReactGetItemsState{    
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

export default class BingMap extends React.Component<IBingMapProps, IReactGetItemsState> {
  
  public constructor(props: IBingMapProps, state: IReactGetItemsState){    
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
        success: (resultData) => {
          const mapInfoBoxArr: any = this.getMapInfoBoxes(resultData.d.results);
          reactHandler.setState({    
            items: resultData.d.results,
            mapInfoBoxes: mapInfoBoxArr,
          });    
        },    
        error : (jqXHR, textStatus, errorThrown) => {    
        }    
    });    
  }

  private getMapInfoBoxes = (listItems) => {
    let arr = [];
    for (var i = 0; i < listItems.length; i++) {    
      const latitude =   listItems[i].GeoLoc.Latitude;
      const longitude =  listItems[i].GeoLoc.Longitude;
      arr.push({
          location: [latitude,longitude],
          addHandler: "click",
          infoboxOption: {title: listItems[i].Title, description: listItems[i].Hours},
          pushPinOption: {color: "red" },
      });
  }
  return arr;
  }  
  
  public render(): React.ReactElement<IBingMapProps> {    
  const myArray = this.state.mapInfoBoxes;   
 
  if(myArray.length > 1)
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
                  infoboxesWithPushPins = {myArray}                        
                  >
                  </ReactBingmaps> 
            </div>          
          );
    }
  else
      { return (<div>map is loading...</div>);}
  }
}

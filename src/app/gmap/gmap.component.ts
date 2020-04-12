import { Component,ViewChild,ElementRef,AfterViewInit } from '@angular/core';
import { StoresData } from '../data/stores-data';
@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements AfterViewInit{

  constructor() { }

  ngAfterViewInit(){
    this.mapInitilizer();

  }

  @ViewChild('mapArea', {static: false}) gmap: ElementRef;
  
  map: google.maps.Map;

  mumbai={
    lat: 19.0760,
    lng: 72.8777
  };

  losAngeles={
    lat: 33.9976552,
    lng: -118.2437
  };

  markers:any[]=[];

  coordinatestodisplay= new google.maps.LatLng(this.losAngeles);

  mapOptions:google.maps.MapOptions={
    center: this.coordinatestodisplay,
    zoom:11
  };

  storelist= new StoresData().getstores();
  foundStores=[];

  infowindow= new google.maps.InfoWindow();



  mapInitilizer(){
    this.map= new google.maps.Map(this.gmap.nativeElement,this.mapOptions);
    this.createMarker(this.storelist);
  }

  createMarker(storelist){
    let bounds = new google.maps.LatLngBounds();
    for(var [index,store] of storelist.entries()){
      index+=1; 
      let latlng = new google.maps.LatLng(store.coordinates.latitude,store.coordinates.longitude);
      let name = store.name;
      let address = store.address.streetAddressLine1 + store.address.city;
      let openStatusText = store.openStatusText;
      let phoneNumber= store.phoneNumber;
      bounds.extend(latlng);  
      this.markMarkers(latlng,name,address,openStatusText,phoneNumber,index);
    }
      this.map.fitBounds(bounds);
  }

  markMarkers(latlng,name,address,openStatusText,phoneNumber,index){
  
    let currentMarker= new google.maps.Marker({
      position: latlng,
      map:this.map,
      label: index.toString()
    });   

    let html = `
            <div id="infobox" class="store-info-window" 
            style="
              color: black;
              width: 300px;
              height: auto;
              font: 25px;
              font-size: 17px;
              padding: 2px;
            ">
              <div class="store-info-name"
            style="
              font-weight: bold;
            ">
                ${name}
              </div>
              <div class="store-info-status">
                <span class="small">${openStatusText}</span>
              </div>
              <div class="store-info-address">
                  <i class ="fa fa-location-arrow"></i>
                ${address}
              </div>
              <div class="store-info-phone">
                  <i class="fa fa-phone-alt"></i> 
                ${phoneNumber}
              </div>
            </div>
    `;

    google.maps.event.addListener(currentMarker,'click',()=>{
      
      this.map.setCenter(currentMarker.getPosition());
      this.map.setZoom(13);
      this.infowindow.setContent(html);
      this.infowindow.open(this.map,currentMarker);
    });
    this.markers.push(currentMarker);
  }


  onContainerItemClick(index:number){
    google.maps.event.trigger(this.markers[index],'click');
  }

  searchStore(zipInputField:HTMLInputElement){
    this.foundStores=[];
    let zipcode= zipInputField.value.toString();
    this.storelist.forEach(store => {
      //console.log(store.address.postalCode.substr(0,5));
        if(store.address.postalCode.substr(0,5)==zipcode){
          this.foundStores.push(store);
        }      
    });
    console.log(this.foundStores);
    
  }
}

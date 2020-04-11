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

  markers:any[]

  coordinatestodisplay= new google.maps.LatLng(this.losAngeles);

  mapOptions:google.maps.MapOptions={
    center: this.coordinatestodisplay,
    zoom:11
  };

  storelist= new StoresData().getstores();
  

  mapInitilizer(){
    this.map= new google.maps.Map(this.gmap.nativeElement,this.mapOptions);
    this.createMarker(this.storelist);
  }

  createMarker(storelist){
    for(var [index,store] of storelist.entries()){
      index+=1; 
      this.markMarkers(store.coordinates,store.name,store.address,index);
        
    }
  }

  markMarkers(latln,name,address,index){
     new google.maps.Marker({
      position: new google.maps.LatLng(latln.latitude,latln.longitude),
      map:this.map,
      label: index.toString()
      
    });     
  }


}

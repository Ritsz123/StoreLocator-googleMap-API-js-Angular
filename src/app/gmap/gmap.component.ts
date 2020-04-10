import { Component,OnInit,ViewChild,ElementRef,AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements AfterViewInit{

  constructor() { }

  @ViewChild('mapArea', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  mumbai={
    lat: 19.0760,
    lng: 72.8777
  };
  coordinates= new google.maps.LatLng(this.mumbai);
  mapOptions:google.maps.MapOptions={
    center:this.coordinates,
    zoom:11
  };

  mapInitilizer(){
    this.map= new google.maps.Map(this.gmap.nativeElement,this.mapOptions);
  }

  ngAfterViewInit(){
    this.mapInitilizer();
  }

}

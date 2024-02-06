<script setup lang="ts">


import mapboxgl from 'mapbox-gl'
import {onMounted, ref} from "vue";
import {MyGeoSqueals} from "./utilities";
const map = ref()
const squeals = ref()
const mapContainer = ref();
mapboxgl.accessToken = 'pk.eyJ1IjoiY2xhdWRpb2ppbiIsImEiOiJjbHJ0MjB4ZDgwMjJ0Mm9wYnh2ZWJ5cDMwIn0.vFu5TdklqP4EtSh4YCpusw'


onMounted(async () => {
  squeals.value = await MyGeoSqueals();
  squeals.value = squeals.value.data;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          map.value = new mapboxgl.Map({
            container: mapContainer.value,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [position.coords.longitude, position.coords.latitude],
            zoom: 10,
          });

          map.value.on('load', () => {

            map.value.addSource('route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: squeals.value.map((squeal:any) => squeal.geo.coordinates),
                },
              },
            });

            map.value.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#888',
                'line-width': 6,
              },
            });
          });
        },
        () => {
          console.error('Error getting location');
        }
    );
  } else {
    console.error('Geolocation is not supported by this browser');
  }
});

</script>

<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<style scoped>
.map-container {
  width: 100vw;
  height: 100vh
}
</style>
<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import mapboxgl from 'mapbox-gl';
import {apiClient, getChannels} from "./utilities.ts";

const map = ref(null);
const currentPosition = ref({latitude: 0, longitude: 0});
const mapContainer = ref(null)

// const canale = await getChannels('P');
const channelSelected = ref('automaticMessage')
let intervalId;
const text = ref('Ciao a tutti, ho publiccato la mia nuova posizione')
// onMounted(() => {
//   const token = localStorage.getItem('token');
//
//   mapboxgl.accessToken = 'pk.eyJ1IjoiY2xhdWRpb2ppbiIsImEiOiJjbHJ0MjB4ZDgwMjJ0Mm9wYnh2ZWJ5cDMwIn0.vFu5TdklqP4EtSh4YCpusw'; // 替换为你的Mapbox访问令牌
//
//   map.value = new mapboxgl.Map({
//     container: mapContainer.value,
//     style: 'mapbox://styles/mapbox/streets-v11',
//     center: [currentPosition.value.longitude, currentPosition.value.latitude], // 设置地图中心点 [经度, 纬度]
//     zoom: 15
//   });
//   if (navigator.geolocation) {
//     intervalId = setInterval(() => {
//
//       navigator.geolocation.getCurrentPosition(
//           position => {
//             currentPosition.value = {
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude
//             };
//             map.value.setCenter([currentPosition.value.longitude, currentPosition.value.latitude]);
//             const data = new FormData()
//             data.append('longitude', currentPosition.value.longitude)
//             data.append('latitude', currentPosition.value.latitude)
//             data.append('body', text.value);
//             // data.append('channel', channelSelected.value);
//             data.append('automaticMessage', true);
//             console.log(data)
//
//             apiClient.post('/social/squeal_post/', data, {
//               headers: {
//                 'Content-Type': 'multipart/form-data',
//                 'Authorization': `Bearer ${token}`
//               }
//             })
//                 .then(response => {
//                   console.log("Response: ", response.data)
//                 })
//                 .catch(error => {
//                   console.error("Error:", error);
//                 })
//           },
//           (error) => {
//             console.log('Error getting device location:', error)
//           }
//       )
//     }, 100000000)
//   } else {
//     console.log("Geolocation is not supported by this browser")
//   }
// })

onUnmounted(() => {
  clearInterval(intervalId);

});

</script>

<style>
.map-container {
  width: 400px;
  height: 400px;
}
</style>

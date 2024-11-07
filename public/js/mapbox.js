export const displayMap = (locations) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibWlzdGVyZm94eWRldiIsImEiOiJjbTM0cGpwZWcwMmVkMmlwZ2w2bGV4aW1qIn0.c-Xw-lA3KjofG97NVLFd5Q";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/misterfoxydev/cm34qom6v001s01nw4q566mq5",
    scrollZoom: false,
    //   center: [-118, 34],
    //   zoom: 5,
    //   interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement("div");
    el.className = "marker";

    // Add marker
    const marker = new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    const popup = new mapboxgl.Popup({
      closeOnClick: false,
      closeButton: true,
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    marker.getElement().addEventListener("click", () => {
      if (!popup.isOpen()) {
        popup.addTo(map).setLngLat(marker.getLngLat());
      } else {
        popup.remove();
      }
    });

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav, "top-right");
};

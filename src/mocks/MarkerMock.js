export const markerMock = (id) => ({
  _initHooksCalled: true,
  _latlng: {
    lat: 11.11,
    lng: 22.22,
  },
  coordinates: [11.11, 22.22],
  id: id,
  name: `Waypoint ${id}`,
  options: {
    icon: {
      _initHooksCalled: true,
      options: {
        className: "marker-icon",
        html: 1,
        iconSize: [25, 25],
      },
    },
  },
});

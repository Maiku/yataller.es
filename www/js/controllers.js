angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('home', function($scope, $ionicLoading, $compile) {
    function initialize() {
        var infobox = new InfoBox({
         content: document.getElementById("infobox"),
         disableAutoPan: false,
         maxWidth: 150,
         pixelOffset: new google.maps.Size(-140, 0),
         zIndex: null,
         boxStyle: {
            background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
        },
        closeBoxMargin: "12px 4px 2px 2px",
        closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
        infoBoxClearance: new google.maps.Size(1, 1)
    });

        var myLatlng = new google.maps.LatLng(39.4575254,-0.390458 );
        var myLatlng2 = new google.maps.LatLng(39.458319, -0.388932);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = '<div class="card ventana-taller">\n<div class="title-card">\n<h4>Taller 2 S.L.</h4>\n<h6>Calle Roca 4 - 46007</h6>\n</div>\n<div class="item item-text-wrap">\n<div class="row">\n<div class="col-90">\nEn taller 2 nos dedicamos al automovil desde 1988 y blablabla blabla bla\n</div>\n</div>\n</div>\n<div class="row">\n<div class="col-50">\n<span class="item item-icon-left">\n<i class="icon ion-waterdrop"></i>\nCambio de aceite\n<span class="badge badge-light">35€</span>\n</span>\n</div>\n<div class="col-50">\n<span class="item item-icon-left">\n<i class="icon ion-disc"></i>\nCambio de neumaticos\n<span class="badge badge-light">75€</span>\n</span>\n</div>\n</div>\n<div class="row">\n<div class="col-50">\n<span class="item item-icon-left">\n<i class="icon ion-ios-infinite"></i>\nAlineación\n<span class="badge badge-light">50€</span>\n</span>\n</div>\n<div class="col-50">\n<span class="item item-icon-left">\n<i class="icon ion-paintbrush"></i>\nCambio Tubo de Escape\n<span class="badge badge-light">100€</span>\n</span>\n</div>\n</div>\n</div>';
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });
        var marker = new google.maps.Marker({
          position: myLatlng2,
          map: map,
          title: 'Uluru (Ayers Rock2)'
        });
        
        google.maps.event.addListener(marker, 'click', function() {
          infobox.open(map,marker);
        });

        $scope.map = map;
      }
      google.maps.event.addDomListener(window, 'load', initialize);
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});

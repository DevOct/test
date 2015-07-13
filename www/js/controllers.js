angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal

  $scope.$on('tab.shown', function() {

      $state.go('tabs.contact');
      
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
  $scope.closeMod = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.terms = function() {
    $ionicModal.fromTemplateUrl('templates/terms.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  $scope.privacy = function() {
    $ionicModal.fromTemplateUrl('templates/privacy.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };
})

.controller('FeedsController', function($scope, $http, $stateParams, $ionicHistory, dataFactory) {
  $ionicHistory.nextViewOptions({
    disableBack: true
  });

  $scope.lala = true;
  $scope.feeds = [];

  $scope.$on('service.feeds',function(){
    $scope.feeds = API.storage.get("feeds");
    console.log("lala");
  });
  dataFactory._get( 
    { 
      _url:"http://app.octantapp.com/api/feed/oct5678093672",
      _token: "feeds",
      _then: function(data, status, headers, config){
        return JSON.parse(data.feed_id);
      },
      _success: function(data){
        API.storage.remove('feeds');
      },
      _error: function(data){
        API.storage.get('feeds');
      }
    }
  );
  // $scope.feeds = [
  //   { message_title: 'Reggae', message_id: 1, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
  //   { message_title: 'Chill', message_id: 2, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
  //   { message_title: 'Dubstep', message_message_id: 3, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
  //   { message_title: 'Indie', message_id: 4, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
  //   { message_title: 'Rap', message_id: 5, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
  //   { message_title: 'Cowbell', message_id: 6, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }
  // ];

})

.controller('FeedController', function($scope, $stateParams) {
  //alert($stateParams.feedid);
  $scope.feed = API.storage.get("feeds");
  console.log("foundAllFeeds:",$scope.feed,"need",$stateParams.message_id)
  for(i in $scope.feed){
    if($scope.feed[i].message_id == $stateParams.message_id){
      temp = $scope.feed[i];
      $scope.feed = null;
      $scope.feed = temp;
      console.log("foundFeed:",$scope.feed)
      break;
    }

  }

})

.controller('ProfileController', function($scope,dataFactory) {

  $scope.$on('service.profile', function(){
    $scope.profile = API.storage.get("profile");
  });

  dataFactory._get(
    { 
      _url:"http://app.octantapp.com/api/dl/oct5678093672",
      _token: "profile",
      _then: function(data, status, headers, config){
        console.log(data);
        return JSON.parse(data.tc_id);
      },
      _success: function(data){
        API.storage.remove('feeds');
      },
      _error: function(data){
        API.storage.get('feeds');
      }
    }
  );

  $scope.popup = dataFactory._alert;
})

.controller('ModalController', function($scope, dataFactory) {
  k = null;

  head = null;
  body = [];

  $scope.$on('service.terms',function(){
    $scope.terms = API.storage.get("terms");
  });
  dataFactory._get( 
    { 
      _url:"http://app.octantapp.com/api/td/oct5678093672",
      _token: "terms",
      _then: function(data, status, headers, config){
        k = JSON.parse(data.tc_id);
        var terms = [];

        for (var i = 0; i < k.length; i++) {

          l = document.createElement('div');
          l.innerHTML = k[i].tc_donor;

          //fetch h1
          var h = l.getElementsByTagName("h1")[0]
          head = h.innerHTML;
          h.remove();

          //fetch everything else in order
          for (var j = 0; j < l.childElementCount; j++) {
            body[j] = {
                id: j.toString(),
                html: l.children[j].outerHTML};
          };
          //mix them together
          terms[i] = {head,body};
          body = [];
        };
        return terms;
      },
      _success: function(data){
        API.storage.remove('terms');
      },
      _error: function(data){
        API.storage.get('terms');
      }
    }
  );

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

})

.controller('LoginController', function($scope) {

})

.controller('SignupController', function($scope) {

  // Triggered in the login modal to close it
})

.controller('EventsController', function($scope) {

  // Triggered in the login modal to close it
})

.controller('MessagesController', function($scope) {

  // Triggered in the login modal to close it
})

.controller('DonateController', function($scope) {

  // Triggered in the login modal to close it
})

.controller('PledgeController', function($scope) {

  // Triggered in the login modal to close it
})

.run(function($rootScope, $ionicModal) {

  $rootScope.groups = [];
  for (var i=0; i<10; i++) {
    $rootScope.groups[i] = {
      name: i,
      items: [],
      show: false
    };
    for (var j=0; j<3; j++) {
      $rootScope.groups[i].items.push(i + '-' + j);
    }
  }
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $rootScope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $rootScope.isGroupShown = function(group) {
    return group.show;
  };

})
.factory('_Global', function($ionicLoading){
  return {
    showloading: function(){
      $ionicLoading.show();
    },
    hideloading: function(){
      $ionicLoading.hide();
    }
  }
})

.factory('dataFactory', function($http,$rootScope,$ionicPopup) {

  return {

// settings = {
//   _url = "";
//   _token = "";
//   _then = function(){};
//   _success = function(){};
//   _error = function(){}
// }

    _get: function(settings){

      $rootScope.$broadcast('loading.show');

      if(API.storage.get(settings._token)){
        console.log("lala",settings._token)
        $rootScope.$broadcast('service.'+settings._token);
        $rootScope.$broadcast('loading.hide');
        return true;
      }
      else{
        this._fetch(settings._url).
        then(
          function(res){
            console.log(res);
            if(typeof settings._success === 'function')
              settings._success(res.data, res.status, res.headers, res.config);
            API.storage.set(
              settings._token,
              settings._then(res.data, res.status, res.headers, res.config)
            );
            $rootScope.$broadcast('service.'+settings._token);
            $rootScope.$broadcast('loading.hide');

          },
          function(res){
            if(typeof settings._success === 'function')
             settings._error(res.data, res.status, res.headers, res.config);
             $rootScope.$broadcast('loading.hide');
             $rootScope.showAlert = function() {
               var alertPopup = $ionicPopup.alert({
                 title: 'Connection Error',
                 template: 'lala'
               });
               alertPopup.then(function(res) {
                 console.log('Thank you for not eating my delicious ice cream cone');
               });
             };
          });
      }

    },
    _fetch: function(_url){

        return $http.get(_url);

    },
    _alert: function(alertHead,alertMessage){
         var alertPopup = $ionicPopup.alert({
           title: alertHead,
           template: alertMessage
         });
         alertPopup.then(function(res) {
           console.log('Thank you for not eating my delicious ice cream cone');
         });

    }
  }

});

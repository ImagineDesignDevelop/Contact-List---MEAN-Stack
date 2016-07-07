var app = angular.module('AppModule', []);
   app.controller('AppController', ['$scope', '$http', function($scope, $http){
       console.log('Hello from AppConroller');

       $scope.openNewContactModal = function(){
           $scope.modalTitle = "New Contact";
           $scope.contact = "";
       }

       // get contacts
       var refresh = function(){
           $http.get('/contactlist')
               .success(function(response){
                   console.log("I got the data request");
                   $scope.contactList = response;
                   $scope.contact = "";
               });
       };
       refresh();
       // add a contact
       $scope.addContact = function(){
           $scope.modalTitle = "New Contact";
           console.log("Lets add a contact");
           console.log($scope.contact);
           $http.post('/contactlist', $scope.contact)
               .success(function(response){
                   console.log(response);
                   refresh();
           });
       };
       // delete a contact
       $scope.removeContact = function(id){
           console.log(id);
           $http.delete('/contactlist/' + id)
               .success(function(response){
                   refresh();
               })
       }
       // update contact
        $scope.updateContact = function(id){
            $scope.modalTitle = "Update Contact";
            console.log(id);
            $http.get('/contactlist/' + id)
                .success(function(response){
                    $scope.contact = response;
                })
        }
       
       $scope.contactUpdate = function(id){
           console.log($scope.contact._id);
           $http.put('/contactlist/' + $scope.contact._id, $scope.contact)
               .success(function(response){
                   refresh();
               })
       }
   }]);

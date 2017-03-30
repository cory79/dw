
var app = angular.module("DWLibretti", []);
app.controller("userController", function($scope) {
    $scope.Libretti = ["Barbaro", "Bardo", "Chierico", "IncantesimiChierico", "Druido", "Guerriero", "Ladro", "Mago", "IncantesimiMago", "Paladino", "Ramingo"];
});
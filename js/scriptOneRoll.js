angular.module("DWOneRoll", [
    'monospaced.elastic'
])
        .filter("sanitize", ['$sce', function($sce) {
                return function(htmlCode) {
                    return $sce.trustAsHtml(htmlCode);
                };
            }])
        .controller("userController",
                function($scope, $http) {
                    
                    $scope.imposta = function(dado) {
                        checkbox = false;
                        angular.forEach($scope.dado_list, function(el) {
                            if (el.Tipo === "checkbox" && el.Dado === dado) {
                                checkbox = true;
                            }
                        });
                        if (checkbox) {
                            temp='';
                            angular.forEach($scope.OneRollThing[dado + '_list'], function(value) {
                                if (value.Checked === true) {                                    
                                    temp += value.Testo+'\n';
                                }
                            });
                            $scope.OneRollThing[dado + '_input'] = temp;
                        } else {
                            $scope.OneRollThing[dado + '_input'] = $scope.OneRollThing[dado + '_list'][$scope.OneRollThing[dado + '_scelta']].Testo;
                        }
                    };

                    $scope.nuovamente = function(dado) {
                        numeroDado=dado.replace("d", "");
                        indexDado = $scope.dado.indexOf(dado);
                        risultato = getRandomInt(0, numeroDado-1);
                        if( $scope.dado_list[indexDado].Tipo === 'radio' ){
                            $scope.OneRollThing[dado+'_input'] = $scope.OneRollThing[dado+'_list'][risultato].Testo;
                            $scope.OneRollThing[dado+'_scelta'] = risultato;
                        }else{
                            $scope.OneRollThing[dado+'_input'] += '\n'+$scope.OneRollThing[dado+'_list'][risultato].Testo;
                            $scope.OneRollThing[dado+'_list'][risultato].Checked = true;
                            ntotDiReroll=$scope.OneRollThing[dado+'_list'][risultato].Reroll;
                            if(typeof ntotDiReroll !== 'undefined'){
                                if(typeof ntotDiReroll === 'number'){
                                    for (var i=0; i<ntotDiReroll; i++) {
                                        $scope.nuovamente(dado);
                                    }
                                } else{
                                    ntotDiReroll = getRandomInt(ntotDiReroll[0], ntotDiReroll[1]);
                                    for (var i=0; i<ntotDiReroll; i++) {
                                        $scope.nuovamente(dado);
                                    }
                                }
                            }
                            
                        }
                    };


                    $scope.genera = function() {
                        $scope.svuota();
                        $scope.OneRollThing.d4_scelta = getRandomInt(0, 3);
                        $scope.OneRollThing.d6_scelta = getRandomInt(0, 5);
                        $scope.OneRollThing.d8_scelta = getRandomInt(0, 7);
                        $scope.OneRollThing.d10_scelta = getRandomInt(0, 9);
                        $scope.OneRollThing.d12_scelta = getRandomInt(0, 11);
                        $scope.OneRollThing.d20_scelta = getRandomInt(0, 19);

                        $scope.OneRollThing.d4_input = $scope.OneRollThing.d4_list[$scope.OneRollThing.d4_scelta].Testo;
                        $scope.OneRollThing.d6_input = $scope.OneRollThing.d6_list[$scope.OneRollThing.d6_scelta].Testo;
                        $scope.OneRollThing.d8_input = $scope.OneRollThing.d8_list[$scope.OneRollThing.d8_scelta].Testo;
                        $scope.OneRollThing.d10_input = $scope.OneRollThing.d10_list[$scope.OneRollThing.d10_scelta].Testo;
                        $scope.OneRollThing.d12_input = $scope.OneRollThing.d12_list[$scope.OneRollThing.d12_scelta].Testo;
                        $scope.OneRollThing.d20_input = $scope.OneRollThing.d20_list[$scope.OneRollThing.d20_scelta].Testo;

                        angular.forEach($scope.dado_list, function(el) {
                            if (el.Tipo === "checkbox") {
                                $scope.OneRollThing[el.Lista][$scope.OneRollThing[el.Scelta]].Checked = true;
                            }
                        });
                        
                        angular.forEach($scope.dado_list, function(el) {
                            lista=el.Lista;
                            eventualeReroll=$scope.OneRollThing[el.Lista][$scope.OneRollThing[el.Scelta]].Reroll;
                            if(typeof eventualeReroll !== 'undefined'){
                                if(typeof eventualeReroll === 'number'){
                                    for (var i=0; i<eventualeReroll; i++) {
                                        $scope.nuovamente(el.Dado);
                                    }
                                } else{
                                    totDiReroll = getRandomInt(eventualeReroll[0], eventualeReroll[1]);
                                    for (var i=0; i<totDiReroll; i++) {
                                        $scope.nuovamente(el.Dado);
                                    }
                                }
                            }
 
                            
                        });
                        
                        
                        
                    };

                    $scope.svuota = function() {
                        $scope.OneRollThing.Nome = "";
                        $scope.OneRollThing.Descrizione = "";
                        $scope.OneRollThing.d4_input = "";
                        $scope.OneRollThing.d6_input = "";
                        $scope.OneRollThing.d8_input = "";
                        $scope.OneRollThing.d10_input = "";
                        $scope.OneRollThing.d12_input = "";
                        $scope.OneRollThing.d20_input = "";
                        $scope.OneRollThing.d4_scelta = -1;
                        $scope.OneRollThing.d6_scelta = -1;
                        $scope.OneRollThing.d8_scelta = -1;
                        $scope.OneRollThing.d10_scelta = -1;
                        $scope.OneRollThing.d12_scelta = -1;
                        $scope.OneRollThing.d20_scelta = -1;

                        angular.forEach($scope.dado_list, function(el) {
                            if (el.Tipo === "checkbox") {
                                angular.forEach($scope.OneRollThing[el.Lista], function(el) {
                                    el.Checked = false;
                                });
                            }
                        });
                    };

                    $scope.dado = ["d4", "d6", "d8", "d10", "d12", "d20"];


                    $http.get(FiledaCaricare)
                        .then(function(response) {
                            //First function handles success
                            $scope.dado_list=response.data.dado_list;
                            $scope.OneRollThing=response.data.OneRollThing;
                            
                        }, function(response) {
                            //Second function handles error
                            console.log(response);
                        });
                });


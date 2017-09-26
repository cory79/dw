angular.module("DWOneRoll", [
    'monospaced.elastic'
])
        .filter("sanitize", ['$sce', function ($sce) {
                return function (htmlCode) {
                    return $sce.trustAsHtml(htmlCode);
                };
            }])
        .controller("userController",
                function ($scope, $http) {

                    $scope.imposta = function (el) {
                        if (el.Tipo === "checkbox") {
                            checkbox = true;
                        } else {
                            checkbox = false;
                        }
                        if (checkbox) {
                            temp = '';
                            angular.forEach($scope.OneRollThing[el.Lista], function (value) {
                                if (value.Checked === true) {
                                    temp += value.Testo + '\n';
                                }
                            });
                            $scope.OneRollThing[el.Input] = temp;
                        } else {
                            $scope.OneRollThing[el.Input] = $scope.OneRollThing[el.Lista][$scope.OneRollThing[el.Scelta]].Testo;
                        }
                    };
                    $scope.LancioDado = function (el, ignorare) {
                        dado = el.Dado;
                        numeroDado = dado.replace("d", "");
                        risultato = getRandomInt(0, numeroDado - 1);
                        
                        if (typeof ignorare !== 'undefined') {
                            if(ignorare.indexOf( risultato +1 ) !== -1){
                                risultato = $scope.LancioDado(el,ignorare);
                            }
                        }
                        
                        return risultato;
                    };
                    $scope.nuovamente = function (el) {
                        if (el.Tipo === 'radio') {
                            risultato = $scope.LancioDado(el);
                            $scope.OneRollThing[el.Input] = $scope.OneRollThing[el.Lista][risultato].Testo;
                            $scope.OneRollThing[el.Scelta] = risultato;
                        } else {
                            $scope.OneRollThing[el.Scelta] = -1;
                            $scope.OneRollThing[el.Input] = "";
                            angular.forEach($scope.OneRollThing[el.Lista], function (el) {
                                el.Checked = false;
                            });
                            risultato = $scope.LancioDado(el);
                            $scope.OneRollThing[el.Input] += '\n' + $scope.OneRollThing[el.Lista][risultato].Testo;
                            $scope.OneRollThing[el.Lista][risultato].Checked = true;
                            ntotDiReroll = $scope.OneRollThing[el.Lista][risultato].Reroll;
                            if (typeof ntotDiReroll !== 'undefined') {
                                if (typeof ntotDiReroll === 'number') {
                                    for (var i = 0; i < ntotDiReroll; i++) {
                                        risultato = $scope.LancioDado(el);
                                        $scope.OneRollThing[el.Input] += '\n' + $scope.OneRollThing[el.Lista][risultato].Testo;
                                        $scope.OneRollThing[el.Lista][risultato].Checked = true;
                                    }
                                } else {
                                    ignorare = ntotDiReroll[2];
                                    ntotDiReroll = getRandomInt(ntotDiReroll[0], ntotDiReroll[1]);

                                    for (var i = 0; i < ntotDiReroll; i++) {
                                        risultato = $scope.LancioDado(el,ignorare);

                                        $scope.OneRollThing[el.Input] += '\n' + $scope.OneRollThing[el.Lista][risultato].Testo;
                                        $scope.OneRollThing[el.Lista][risultato].Checked = true;
                                    }
                                }
                            }

                        }
                    };

                    $scope.genera = function () {
                        $scope.svuota();

                        angular.forEach($scope.dado_list, function (el) {
                            $scope.OneRollThing[el.Scelta] = $scope.LancioDado(el);
                            $scope.OneRollThing[el.Input] = $scope.OneRollThing[el.Lista][$scope.OneRollThing[el.Scelta]].Testo;
                        });

                        angular.forEach($scope.dado_list, function (el) {
                            if (el.Tipo === "checkbox") {
                                $scope.OneRollThing[el.Lista][$scope.OneRollThing[el.Scelta]].Checked = true;
                            }
                        });

                        angular.forEach($scope.dado_list, function (el) {
                            eventualeReroll = $scope.OneRollThing[el.Lista][$scope.OneRollThing[el.Scelta]].Reroll;
                            if (typeof eventualeReroll !== 'undefined') {
                                if (typeof eventualeReroll === 'number') {
                                    for (var i = 0; i < eventualeReroll; i++) {
                                        $scope.nuovamente(el);
                                    }
                                } else {
                                    totDiReroll = getRandomInt(eventualeReroll[0], eventualeReroll[1]);
                                    for (var i = 0; i < totDiReroll; i++) {
                                        $scope.nuovamente(el);
                                    }
                                }
                            }
                        });
                    };

                    $scope.svuota = function () {
                        $scope.OneRollThing.Nome = "";
                        $scope.OneRollThing.Descrizione = "";

                        angular.forEach($scope.dado_list, function (el) {
                            $scope.OneRollThing[el.Scelta] = -1;
                            $scope.OneRollThing[el.Input] = "";
                            if (el.Tipo === "checkbox") {
                                angular.forEach($scope.OneRollThing[el.Lista], function (el) {
                                    el.Checked = false;
                                });
                            }
                        });
                    };

                    $scope.dado = ["d4", "d6", "d8", "d10", "d12", "d20"];


                    $http.get(FiledaCaricare)
                            .then(function (response) {
                                //First function handles success
                                $scope.dado_list = response.data.dado_list;
                                $scope.OneRollThing = response.data.OneRollThing;

                            }, function (response) {
                                //Second function handles error
                                console.log(response);
                            });
                });


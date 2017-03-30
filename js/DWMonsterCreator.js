

angular.module("DWMonsterCreator", [
    'monospaced.elastic'
])
        .filter("sanitize", ['$sce', function($sce) {
                return function(htmlCode) {
                    return $sce.trustAsHtml(htmlCode);
                };
            }])
        .controller("userController",
                function($scope) {
                    $scope.getRisultato = function() {
                        numero = $scope.dado[$scope.Dado].replace("d", "");
                        Risultato = getRandomInt(1, numero);
                        if ($scope.mostro.Etichette.indexOf("avido") >= 0) {
                            Risultato = Math.max(Risultato, getRandomInt(1, numero));
                        }
                        if ($scope.mostro.Etichette.indexOf("dominatore") >= 0) {
                            Risultato = Risultato + getRandomInt(1, 4);
                        }
                        if ($scope.mostro.Etichette.indexOf("antico") >= 0) {
                            Risultato = Risultato + getRandomInt(1, 4);
                        }
                        if (Risultato >= 18) {
                            Risultato = 18;
                        }
                        return Risultato;
                    };
                    $scope.setRisultato = function() {
                        $scope.mostro.Tesoro += $scope.TabellaTesoro[Risultato][1];
                        if ($scope.TabellaTesoro[Risultato][0] !== 0) {
                            if (Risultato === 18) {
                                Monete = getRandomInt($scope.TabellaTesoro[Risultato][0][0][0], $scope.TabellaTesoro[Risultato][0][0][1]);
                                Monete = Monete * $scope.TabellaTesoro[Risultato][0][0][2];
                                $scope.mostro.Tesoro = $scope.mostro.Tesoro.replace('$MONETE$', Monete);

                                Gemme = getRandomInt($scope.TabellaTesoro[Risultato][0][1][0], $scope.TabellaTesoro[Risultato][0][1][1]);
                                Gemme = Gemme * $scope.TabellaTesoro[Risultato][0][1][2];
                                $scope.mostro.Tesoro = $scope.mostro.Tesoro.replace('$GEMME$', Gemme);

                                Valore = getRandomInt($scope.TabellaTesoro[Risultato][0][2][0], $scope.TabellaTesoro[Risultato][0][2][1]);
                                Valore = Valore * $scope.TabellaTesoro[Risultato][0][2][2];
                                $scope.mostro.Tesoro = $scope.mostro.Tesoro.replace('$VALORE$', Valore);
                            } else {
                                Monete = getRandomInt($scope.TabellaTesoro[Risultato][0][0], $scope.TabellaTesoro[Risultato][0][1]);
                                Monete = Monete * $scope.TabellaTesoro[Risultato][0][2];
                                $scope.mostro.Tesoro = $scope.mostro.Tesoro.replace('$MONETE$', Monete);
                            }
                        }

                        if (Risultato === 15 || Risultato === 16 || Risultato === 17) {
                            Risultato = $scope.getRisultato();
                            $scope.setRisultato();
                        }

                    };


                    $scope.riempiPerTest = function() {
                        $scope.mostro.Etichette = "lontano,dominatore,avido,antico";
                        $scope.mostro.Attacco = "(d6)";
                        $scope.Dado = 5;
                    };
                    $scope.tesoro = function() {
                        if ($scope.mostro.Etichette.length === 0 || $scope.mostro.Attacco.length === 0) {
                            return false;
                        }
                        $scope.mostro.Tesoro = "";


                        if ($scope.mostro.Etichette.indexOf("lontano") >= 0) {
                            $scope.mostro.Tesoro += $scope.etichetteTesoro['lontano'][0];
                        }
                        if ($scope.mostro.Etichette.indexOf("magico") >= 0) {
                            $scope.mostro.Tesoro += $scope.etichetteTesoro['magico'][0];
                        }
                        if ($scope.mostro.Etichette.indexOf("divino") >= 0) {
                            $scope.mostro.Tesoro += $scope.etichetteTesoro['divino'][0];
                        }
                        if ($scope.mostro.Etichette.indexOf("planare") >= 0) {
                            $scope.mostro.Tesoro += $scope.etichetteTesoro['planare'][0];
                        }

                        Risultato = $scope.getRisultato();
                        $scope.setRisultato();

                    };
                    $scope.svuota = function() {
                        $scope.mostro.Nome = "";
                        $scope.mostro.Etichette = "";
                        $scope.mostro.Attacco = "";
                        $scope.mostro.EtichetteAttacco = "";
                        $scope.mostro.PF = "";
                        $scope.mostro.Armatura = "";
                        $scope.mostro.Qualita = "";
                        $scope.mostro.Istinto = "";
                        $scope.mostro.Mosse = "";
                        $scope.mostro.Descrizione = "";
                        $scope.mostro.Tesoro = "";
                        $scope.mostro.sceltaBranco = -1;
                        $scope.mostro.sceltaDimensione = -1;
                        $scope.mostro.sceltaArmatura = -1;
                        $scope.mostro.DannoPerforante = 0;
                        angular.forEach($scope.mostro.notorieta, function(el) {
                            el.Checked = false;
                        });
                        angular.forEach($scope.mostro.attacco, function(el) {
                            el.Checked = false;
                        });
                        angular.forEach($scope.mostro.descrizione, function(el) {
                            el.Checked = false;
                        });
                    };
                    $scope.impostaEtichette = function() {
                        $scope.mostro.Etichette_list = [];
                        $scope.mostro.EtichetteAttacco_list = [];
                        $scope.mostro.PF_list = [];
                        $scope.mostro.Armatura_list = [];
                        $scope.mostro.Attacco_list = [];
                        $scope.mostro.Dado_list = [];
                        $scope.mostro.DoppioTiro_list = [];
                        $scope.mostro.DannoPerforante_list = [];


                        if ($scope.mostro.sceltaBranco >= 0) {
                            $scope.mostro.Etichette_list.push($scope.mostro.branco[$scope.mostro.sceltaBranco].Tag);
                            $scope.mostro.PF_list.push($scope.mostro.branco[$scope.mostro.sceltaBranco].PF);
                        }
                        if ($scope.mostro.sceltaDimensione >= 0) {
                            $scope.mostro.Etichette_list.push($scope.mostro.dimensione[$scope.mostro.sceltaDimensione].Tag);
                            $scope.mostro.PF_list.push($scope.mostro.dimensione[$scope.mostro.sceltaDimensione].PF);
                            $scope.mostro.EtichetteAttacco_list.push($scope.mostro.dimensione[$scope.mostro.sceltaDimensione].TagAttacco);
                            $scope.mostro.Attacco_list.push($scope.mostro.dimensione[$scope.mostro.sceltaDimensione].Danni);
                        }
                        if ($scope.mostro.sceltaArmatura >= 0) {
                            $scope.mostro.Etichette_list.push($scope.mostro.armatura[$scope.mostro.sceltaArmatura].Tag);
                            $scope.mostro.Armatura_list.push($scope.mostro.armatura[$scope.mostro.sceltaArmatura].Armatura);
                        }
                        angular.forEach($scope.mostro.notorieta, function(value) {
                            if (value.Checked === true) {
                                $scope.mostro.Etichette_list.push(value.Tag);
                                $scope.mostro.EtichetteAttacco_list.push(value.TagAttacco);
                                $scope.mostro.PF_list.push(value.PF);
                                $scope.mostro.Armatura_list.push(value.Armatura);
                                $scope.mostro.Attacco_list.push(value.Danni);
                                $scope.mostro.DoppioTiro_list.push(value.DanniDoppioTiro);
                                $scope.mostro.DannoPerforante_list.push(value.DannoPerforante);
                            }
                        });
                        angular.forEach($scope.mostro.attacco, function(value) {
                            if (value.Checked === true) {
                                $scope.mostro.Etichette_list.push(value.Tag);
                                $scope.mostro.EtichetteAttacco_list.push(value.TagAttacco);
                                $scope.mostro.PF_list.push(value.PF);
                                $scope.mostro.Armatura_list.push(value.Armatura);
                                $scope.mostro.Attacco_list.push(value.Danni);
                                $scope.mostro.Dado_list.push(value.Dado);
                                $scope.mostro.DoppioTiro_list.push(value.DanniDoppioTiro);
                                $scope.mostro.DannoPerforante_list.push(value.DannoPerforante);
                            }
                        });
                        angular.forEach($scope.mostro.descrizione, function(value) {
                            if (value.Checked === true) {
                                $scope.mostro.Etichette_list.push(value.Tag);
                                $scope.mostro.EtichetteAttacco_list.push(value.TagAttacco);
                                $scope.mostro.PF_list.push(value.PF);
                                $scope.mostro.Armatura_list.push(value.Armatura);
                                $scope.mostro.Attacco_list.push(value.Danni);
                                $scope.mostro.Dado_list.push(value.Dado);
                                $scope.mostro.DoppioTiro_list.push(value.DanniDoppioTiro);

                            }
                        });
                        $scope.mostro.Etichette = uniq($scope.mostro.Etichette_list.filter(function(n) {
                            return n !== undefined;
                        }));

                        $scope.mostro.EtichetteAttacco = uniq($scope.mostro.EtichetteAttacco_list.filter(function(n) {
                            return n !== undefined;
                        }));

                        $scope.mostro.PF_list = $scope.mostro.PF_list.filter(function(n) {
                            return n !== undefined;
                        });
                        $scope.mostro.PF = $scope.mostro.PF_list.sum();

                        $scope.mostro.Armatura_list = $scope.mostro.Armatura_list.filter(function(n) {
                            return n !== undefined;
                        });
                        $scope.mostro.Armatura = $scope.mostro.Armatura_list.sum();

                        $scope.mostro.DannoPerforante_list = $scope.mostro.DannoPerforante_list.filter(function(n) {
                            return n !== undefined;
                        });
                        $scope.mostro.DannoPerforante = $scope.mostro.DannoPerforante_list.sum();

                        if ($scope.mostro.sceltaBranco >= 0) {
                            $scope.mostro.Attacco_list = $scope.mostro.Attacco_list.filter(function(n) {
                                return n !== undefined;
                            });
                            $scope.mostro.Dado_list = $scope.mostro.Dado_list.filter(function(n) {
                                return n !== undefined;
                            });
                            $scope.mostro.DoppioTiro_list = $scope.mostro.DoppioTiro_list.filter(function(n) {
                                return n !== undefined;
                            });
                            modificatoreDado = $scope.mostro.Dado_list.sum();
                            DoppioTiro = $scope.mostro.DoppioTiro_list.sum();
                            $scope.Dado = $scope.mostro.branco[$scope.mostro.sceltaBranco].Dado + modificatoreDado;


                            if ($scope.mostro.Attacco_list.sum() > 0) {
                                $scope.mostro.Attacco = "(" + $scope.dado[$scope.Dado] + ")" + $scope.doppioTiro[DoppioTiro + 1] + " +" + $scope.mostro.Attacco_list.sum();
                            } else {
                                $scope.mostro.Attacco = "(" + $scope.dado[$scope.Dado] + ")" + $scope.doppioTiro[DoppioTiro + 1];
                            }


                        } else {
                            if ($scope.mostro.Attacco_list.sum() > 0) {
                                $scope.mostro.Attacco = "+" + $scope.mostro.Attacco_list.sum();
                            } else {
                                $scope.mostro.Attacco = "";
                            }

                        }

                        if ($scope.mostro.DannoPerforante > 0) {
                            $scope.mostro.Attacco = $scope.mostro.Attacco + " +" + $scope.mostro.DannoPerforante + " penetrazione";
                        }


                    };

                    $scope.doppioTiro = ["p", "", "m"];
                    $scope.dado = ["d2", "d4", "d6", "d8", "d10", "d12", "d20"];
                    $scope.etichetteTesoro = {
                        avido: ["tira due volte il danno, scegli il risultato migliore", -1],
                        lontano: ["Aggiungi almeno una razione\n", 0],
                        magico: ["Qualche oggetto strano, possibilmente magico\n", 0],
                        divino: ["Il simbolo di una (o più) divinità\n", 0],
                        planare: ["Qualcosa non di questo mondo\n", 0],
                        dominatore: ["+1d4 al tiro", 4],
                        antico: ["+1d4 al tiro", 4]
                    };
                    $scope.TabellaTesoro = {
                        1: [[2, 16, 1], "$MONETE$ monete\n"],
                        2: [0, "Un oggetto utile nella situazione attuale\n"],
                        3: [[4, 40, 1], "$MONETE$ monete\n"],
                        4: [[2, 20, 10], "Un oggetto piccolo (gemma, manufatto artistico) di un certo pregio del valore di $MONETE$ monete, peso 0\n"],
                        5: [0, "Un oggetto magico minore\n"],
                        6: [0, "Informazioni utili (sotto forma di note, indizi, ecc.) \n"],
                        7: [[1, 4, 100], "Una borsa di monete, circa $MONETE$ (peso 1 per ogni 100) \n"],
                        8: [[2, 12, 100], "Un piccolo oggetto di grande valore (gemma, manufatto artistico), pari a $MONETE$ monete, peso 0\n"],
                        9: [[3, 18, 100], "Un cofanetto di monete e altri oggetti di valore, peso 1 ma pari a $MONETE$ monete\n"],
                        10: [0, "Un oggetto o effetto magico\n"],
                        11: [[2, 8, 100], "Molti sacchetti di monete, per un valore di $MONETE$ circa\n"],
                        12: [[3, 12, 100], "Un simbolo di rango (corona, bandiera), del valore di almeno $MONETE$ monete\n"],
                        13: [[4, 16, 100], "Un grande oggetto d’arte del valore di $MONETE$ monete, peso 1\n"],
                        14: [[5, 20, 100], "Un oggetto unico, del valore di almeno $MONETE$ monete\n"],
                        15: [0, "Tutte le informazioni necessarie per creare o imparare un nuovo incantesimo\n"],
                        16: [0, "Un portale o sentiero segreto (o le informazioni per raggiungerlo)\n"],
                        17: [0, "Qualcosa collegato a uno dei personaggi\n"],
                        18: [[[1, 10, 1000], [1, 10, 10], [2, 12, 100]], "Un tesoro: $MONETE$ monete e $GEMME$ gemme del valore di $VALORE$ ciascuna\n"],
                    };
                    $scope.mostro = {
                        Nome: "",
                        Etichette: "",
                        Attacco: "",
                        EtichetteAttacco: "",
                        PF: "",
                        Armatura: "",
                        Qualita: "",
                        Istinto: "",
                        Mosse: "",
                        Descrizione: "",
                        Tesoro: "",
                        sceltaBranco: -1,
                        sceltaDimensione: -1,
                        sceltaArmatura: -1,
                        DannoPerforante: 0,
                        branco: [
                            {Codice: "orda", Testo: "In grandi gruppi: <i>orda, d6 danni, 3 PF</i>", Checked: false, Tag: "orda", PF: 3, Dado: 2},
                            {Codice: "gruppi", Testo: "In piccoli gruppi, da 2 a 5 componenti: <i>gruppo, d8 danni, 6 PF</i>", Checked: false, Tag: "gruppo", PF: 6, Dado: 3},
                            {Codice: "solitario", Testo: "Tutto da solo: <i>solitario, d10 danni, 12 PF</i>", Checked: false, Tag: "solitario", PF: 12, Dado: 4}

                        ],
                        dimensione: [
                            {Codice: "piccolo",
                                Testo: "Pi&ugrave; piccolo di un gatto: minuscolo, corta, -2 danni.",
                                Checked: false,
                                PF: 0,
                                Tag: "minuscolo",
                                TagAttacco: "corta",
                                Danni: -2},
                            {Codice: "mezzuomo",
                                Testo: "Come un mezzuomo: piccolo, corpo-a-corpo.",
                                Checked: false,
                                PF: 0,
                                Tag: "piccolo",
                                TagAttacco: "corpo-a-corpo"},
                            {Codice: "umano",
                                Testo: "A dimensione umana: corpo-a-corpo.",
                                Checked: false,
                                PF: 0,
                                TagAttacco: "corpo-a-corpo"},
                            {Codice: "carro",
                                Testo: "Grande come un carro: grande, corpo-a-corpo, portata, +4 PF, +1 danno.",
                                Checked: false,
                                PF: 4,
                                Tag: "grande",
                                TagAttacco: "corpo-a-corpo,portata",
                                Danni: 1},
                            {Codice: "enorme",
                                Testo: "Molto pi&ugrave; grande di un carro: enorme, portata, +8 PF, +3 danni.",
                                Checked: false,
                                PF: 8,
                                Tag: "enorme",
                                TagAttacco: "portata",
                                Danni: 3}

                        ],
                        armatura: [
                            {Codice: "tessuto", Testo: "Tessuto o carne: armatura 0.", Checked: false, Armatura: 0},
                            {Codice: "cuoio", Testo: "Pelle o cuoio rigido: armatura 1.", Checked: false, Armatura: 1},
                            {Codice: "maglia", Testo: "Maglia o scaglie: armatura 2.", Checked: false, Armatura: 2},
                            {Codice: "piastre", Testo: "Piastre o ossa: armatura 3.", Checked: false, Armatura: 3},
                            {Codice: "magica", Testo: "Protezione magica permanente: armatura 4, magico.", Checked: false, Armatura: 4, Tag: "magico", Tesoro: "magico"}

                        ],
                        notorieta: [
                            {Codice: "forza",
                                Testo: "Forza inarrestabile: +2 danni, impatto.",
                                Checked: false,
                                TagAttacco: "impatto",
                                Danni: 2},
                            {Codice: "offensiva",
                                Testo: "Abilit&agrave; offensiva: tira i danni due volte e prendi il risultato migliore.",
                                Checked: false,
                                DanniDoppioTiro: 1
                            },
                            {Codice: "difensiva",
                                Testo: "Abilit&agrave; difensiva: +1 armatura.",
                                Checked: false,
                                Armatura: 1},
                            {Codice: "preciso",
                                Testo: "Colpi precisi: +1 penetrazione.",
                                Checked: false,
                                DannoPerforante: 1
                            },
                            {Codice: "resistente",
                                Testo: "Resistenza inconsueta: +4 PF.",
                                Checked: false,
                                PF: 4},
                            {Codice: "menzogne",
                                Testo: "Inganno e menzogne: furtivo, scrivi una mossa su dei trucchetti sporchi.",
                                Checked: false,
                                Tag: "furtivo"},
                            {Codice: "speciale",
                                Testo: "Una capacit&agrave; utile come essere anfibi o avere le ali: aggiungi una qualit&agrave; speciale per la capacit&agrave;.",
                                Checked: false
                            },
                            {Codice: "dei",
                                Testo: "Il favore degli dei: divino, +1 danni.",
                                Checked: false,
                                Danni: 1,
                                Tag: "divino",
                                Tesoro: "divino"
                            },
                            {Codice: "dei2",
                                Testo: "Il favore degli dei: divino, +2 PF.",
                                Checked: false,
                                PF: 2,
                                Tag: "divino",
                                Tesoro: "divino"
                            },
                            {Codice: "magico",
                                Testo: "Magie e incantesimi: magico, scrivi una mossa sui suoi incantesimi.",
                                Checked: false,
                                Tag: "magico",
                                Tesoro: "magico"
                            }
                        ],
                        attacco: [
                            {Codice: "letale",
                                Testo: "Le sue fonti di danno sono letali e vistose: +2 danni.",
                                Checked: false,
                                Danni: 2},
                            {Codice: "portata",
                                Testo: "Permette al mostro di tenere gli altri alla larga: portata.",
                                Checked: false,
                                TagAttacco: "portata"},
                            {Codice: "debole",
                                Testo: "Le sue fonti di danno sono piccole e deboli: riduci il dado di danno alla dimensione inferiore.",
                                Dado: -1,
                                Checked: false},
                            {Codice: "perforare",
                                Testo: "Le sue fonti di danno possono tagliare il metallo: devastante e +1 penetrazione",
                                TagAttacco: "devastante",
                                DannoPerforante: 1,
                                Checked: false
                            },
                            {Codice: "perforare3",
                                Testo: "Oppure perforare il metallo: +3 penetrazione.",
                                DannoPerforante: 3,
                                Checked: false
                            },
                            {Codice: "penetrare",
                                Testo: "L'armatura non aiuta con questo tipo di danno (per via di magia, dimensioni, etc.): ignora armatura.",
                                Checked: false,
                                TagAttacco: "ignora armatura"
                            },
                            {Codice: "distanza",
                                Testo: "Solitamente attacca a distanza (con frecce, incantesimi o altri proiettili): vicino, lontano o entrambi (a tua scelta).",
                                Checked: false,
                                TagAttacco: "vicino, lontano"
                            }
                        ],
                        descrizione: [
                            {Codice: "sfuggente",
                                Testo: "Non &egrave; pericoloso per via delle ferite che infligge, ma per altre ragioni: sfuggente, riduci il dado di danno alla dimensione inferiore, scrivi una mossa che spieghi perch&eacute; &egrave; pericoloso.",
                                Checked: false,
                                Dado: -1,
                                Tag: "sfuggente"
                            },
                            {Codice: "organizzato",
                                Testo: "Si organizza in gruppi pi&ugrave; grandi che pu&ograve; contattare per chiedere aiuto: organizzato, scrivi una mossa sul chiamare gli altri per aiutarlo.",
                                Checked: false,
                                Tag: "organizzato"
                            },
                            {Codice: "intelligente",
                                Testo: "&Egrave; intelligente pi&ugrave; o meno come un umano: intelligente.",
                                Checked: false,
                                Tag: "intelligente"
                            },
                            {Codice: "cauto",
                                Testo: "Si difende attivamente con uno scudo o simili strumenti: cauto, +1 armatura.",
                                Checked: false,
                                Tag: "cauto",
                                Armatura: 1
                            },
                            {Codice: "avido",
                                Testo: "Colleziona manufatti considerati preziosi dagli umani (oro, gemme, segreti): avido.",
                                Checked: false,
                                Tag: "avido",
                                Tesoro: "avido"
                            },
                            {Codice: "planare",
                                Testo: "Non &egrave; di questo mondo: planare, scrivi una mossa sull'usare la sua conoscenza e i suoi poteri ultraterreni.",
                                Checked: false,
                                Tag: "planare",
                                Tesoro: "planare"
                            },
                            {Codice: "biologia",
                                Testo: "&Egrave; mantenuto in vita da qualcosa che va oltre alla semplice biologia: +4 PF.",
                                Checked: false,
                                PF: 4
                            },
                            {Codice: "costrutto",
                                Testo: "&Egrave; stato creato o costruito da qualcuno: costrutto, scrivi una qualit&agrave; speciale o due che spieghino la sua fabbricazione o funzione.",
                                Checked: false,
                                Tag: "costrutto"
                            },
                            {Codice: "terrificante",
                                Testo: "Il suo aspetto &egrave; inquietante o mostruoso: terrificante, scrivi una qualit&agrave; speciale che spieghi perch&eacute;.",
                                Checked: false,
                                Tag: "terrificante"
                            },
                            {Codice: "amorfo",
                                Testo: "Non &egrave; dotato di organi o anatomia comprensibile: amorfo, +1 armatura, +3 PF.",
                                Checked: false,
                                Tag: "amorfo",
                                PF: 3,
                                Armatura: 1
                            },
                            {Codice: "antico",
                                Testo: "&Egrave; antico, o lo &egrave; la sua specie; pi&ugrave; vecchio di elfi, uomini e nani: aumenta la dimensione del suo dado di danno.",
                                Checked: false,
                                Dado: +1,
                                Tag: "antico",
                                Tesoro: "antico"
                            },
                            {Codice: "aborre",
                                Testo: "Aborre la violenza: tira i danni due volte e prendi il risultato peggiore.",
                                Checked: false,
                                DanniDoppioTiro: -1
                            }
                        ]
                    };


                })
        .controller("stampaController",
                function($scope) {
                    $scope.stampa = function() {
                        return "" + $scope.mostro.Nome;
                    };
                });


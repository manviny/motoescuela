"use strict";

var demoApp = angular.module('demoApp', ['gantt','ngColorPicker','ui.bootstrap']);

demoApp.controller("ctrl", ['$scope', '$http', '$filter', function($scope, $http, $filter) {

    $scope.mode = "custom";
    $scope.maxHeight = 0;
    // $scope.autoExpand = true;
    $scope.scale = 'hour';
    $scope.showWeekends = true;
    $scope.showNonWorkHours = false;

    $scope.color = '#e1e1e1'; // color por defecto

    /**  
     * Datos especificos para cada calendario
     */
    
    // 1.- se crean columnas con etiquetas  para que aparezcan en  el calendario
    var datosEspecificos = [
            {"id": "IBR1-9083GFL", "description": "IBR1-9083GFL",  "tasks": []},
            {"id": "IBR2-4663", "description": "IBR2-4663",  "tasks": []},
            {"id": "IBR2-4663", "description": "IBR2-4663",  "tasks": []},
            {"id": "IBR3-9120", "description": "IBR3-9120",  "tasks": []},
            {"id": "AUTOMATICA", "description": "AUTOMATICA",  "tasks": []},
            {"id": "A1 MANUAL", "description": "A1 MANUAL",  "tasks": []},
            {"id": "A1 9610GHT", "description": "A1 9610GHT",  "tasks": []},
            {"id": "AM-CICLOMOTOR", "description": "AM-CICLOMOTOR",  "tasks": []},
            {"id": "KAWASAKI", "description": "KAWASAKI",  "tasks": []},
            {"id": "HONDA", "description": "HONDA",  "tasks": []}
    ];

    // 2.- url donde esta la BD mongo
    var dbUrl = 'http://chocomputer.com:3005/api/calendarios';

    // 3.- tipo de datos que se guardan
    //"data": {"alumno":$scope.nombre, "circuito": $scope.circuito}




    /**
     * Detecta cambio de fecha y carga nuevo calendario
     * @param  {[type]} nuevaFecha [description]
     * @return {[type]}            [description]
     */
    $scope.$watch('dt', function(nuevaFecha) {

        $scope.clearData(); // borra datos del calendario
        $scope.addSamples($filter('date')(nuevaFecha, "yyyy-MM-dd")); //carga nuevo calendario

    });

    /**
     * Carga datos en el calendario [ hoy si fecha no esta definida | fecha clicada en el calendario ]
     * @param {[type]} fecha [description]
     */
    $scope.addSamples = function (fecha) {
        

        if(_.isUndefined(fecha)) fecha = ($filter('date')(new Date(), "yyyy-MM-dd")); // si no hay fecha -> carga Hoy

        //Cargar datos basicos para rellenar columnas de etiquetas

        var d = new Date(); var n = d.getTime(); // time desde 1 enero 1970  
        
        datosEspecificos[0].tasks.push({"id": n, "subject": fecha, "from": fecha, "to": fecha}) // crea dato ficticio para calendarios vacios
        $scope.loadData(datosEspecificos);
        datosEspecificos[0].tasks = []; // borra el dato ficticio anterior


        // trae los datos del dia especicicado en el calendario desde el servidor
        $http.get( dbUrl + '?filter[where][id]=' + fecha ) 
        .then(function (datos) { 
            $scope.loadData(datos.data[0].datos);
            console.debug("DATOS SERVIDOR", datos.data[0].datos)    
        });




        //  $http({
        //     url: 'http://chocomputer.com:3005/api/calendarios/22',
        //     method: "DELETE"
        // })
        // .then(function(response) {
        //         alert("success");
        //         alert(JSON.stringify(response));
        //     }, 
        //     function(response) { // optional
        //         alert("fail");
        //         alert(JSON.stringify(response));
        //     }
        // );



    };

    $scope.removeSomeSamples = function () {
        $scope.removeData([
            {"id": "c65c2672-445d-4297-a7f2-30de241b3145"}, // Remove all Kickoff meetings
            {"id": "2f85dbeb-0845-404e-934e-218bf39750c0", "tasks": [
                {"id": "f55549b5-e449-4b0c-9f4b-8b33381f7d76"},
                {"id": "5e997eb3-4311-46b1-a1b4-7e8663ea8b0b"},
                {"id": "6fdfd775-7b22-42ec-a12c-21a64c9e7a9e"}
            ]}, // Remove some Milestones
            {"id": "cfb29cd5-1737-4027-9778-bb3058fbed9c", "tasks": [
                {"id": "57638ba3-dfff-476d-ab9a-30fda1e44b50"}
            ]} // Remove order basket from Sprint 2
        ]);
    };

    $scope.removeSamples = function () {
        $scope.clearData();
      };

    /**
     * Añade practicas la calendario
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    $scope.rowEvent = function(event) {
        // A row has been added, updated or clicked. Use this event to save back the updated row e.g. after a user re-ordered it.
        
        // Si no ha pulsado el usuario en la celda, retorna
        if(!event.userTriggered) return;
        if(!$scope.nombre || !$scope.circuito) return;


        console.debug("click en ROW", event)

        // fecha y hora donde se ha hecho click
        var tempdate = new Date(event.date);
        var fechaFrom = ($filter('date')(tempdate, "yyyy-MM-dd H:00"));

        // añade una hora 
        tempdate.setHours(tempdate.getHours()+1);
        var fechaTo = ($filter('date')(tempdate, "yyyy-MM-dd H:00"));

        // añade el evento
        var d = new Date(); var n = d.getTime(); // time desde 1 enero 1970

        $scope.loadData([
            {"id": event.row.id, "description": event.row.description,  "tasks": [{
                    "id":  n, 
                    "subject": $scope.nombre, 
                    "from": fechaFrom, 
                    "to": fechaTo,
                    "color": $scope.color , 
                    // "classes": $scope.classes,
                    /**
                     * datos especificos del calendario
                     */
                    "data": {"alumno":$scope.nombre, "circuito": $scope.circuito, "notas": $scope.notas}
            }]}
        ]);

        // guarda en BD
        // $scope.guardaCalendario();

        console.log('Row event (by user: ' + event.userTriggered + '): ' + event.date + ' '  + event.row.description + ' (Custom data: ' + event.row.data + ')');
    };

    $scope.scrollEvent = function(event) {
        if (angular.equals(event.direction, "left")) {
            // Raised if the user scrolled to the left side of the Gantt. Use this event to load more data.
            console.log('Scroll event: Left');
        } else if (angular.equals(event.direction, "right")) {
            // Raised if the user scrolled to the right side of the Gantt. Use this event to load more data.
            console.log('Scroll event: Right');
        }
    };


    /**
     * Permite hacer cambios en una celda que ya contiene datos
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    $scope.taskEvent = function(event) {

        // A task has been updated or clicked.
        console.log(event);
        // pone clase intermitente a las tareas que hagamos click
        if(event.task.classes == "intermitente") event.task.classes= "" 
            else event.task.classes= "intermitente";

        // pon los datos del evento en el formulario
        $scope.nombre = event.task.subject;
        $scope.circuito = event.task.data.circuito;
        $scope.color = event.task.color;
        $scope.classes = event.task.classes;
        $scope.notas = event.task.data.notas;


        console.log('Task event (by user: ' + event.userTriggered + '): ' + event.task.subject + ' (Custom data: ' + event.task.data + ')');
    };

    /**
     * Guarda el calendario
     * @return {[type]} [description]
     */
    $scope.guardaCalendario = function() {
        $scope.saveData(dbUrl);
         // $("#guardaCalendario").click();
    }

    /**
     * Borrar tareas intermitentes al pulsar boton borrar
     * @return {[type]} [description]
     */
    $scope.borrarTareas = function() {
        $scope.removeTask("443423445");
    }

}]);
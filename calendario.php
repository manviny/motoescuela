<!doctype html>
<html ng-app="demoApp">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
  <link rel="stylesheet" href="assets/css/gantt.css"/>
  <link rel="stylesheet" href="assets/css/color-picker.css"/>
  <style>.nav, .pagination, .carousel, .panel-title a { cursor: pointer; }</style>
  <title>Motoescuela</title>
</head>
<body>

  <div class="container-fluid">
    <div class="row">
      <div ng-controller="ctrl">

        <div class="col-md-12">
          <h1>Motoescuela</h1>
        </div>
        <div class="col-md-4">
          <div  style="display:inline-block; min-height:290px;">
            <datepicker ng-model="dt" min-date="minDate" show-weeks="true" class="well well-sm"></datepicker>
            <input type="hidden" datepicker-popup="{{format}}" ng-model="dt">
          </div>
        </div>
        <div class="col-md-8">
          <div class="well well-sm">
            <form>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name">
                      Nombre</label>
                      <input type="text" class="form-control" id="name" placeholder="nombre"  ng-model="nombre" />
                    </div>
<!--                     <div class="form-group">
                      <label for="email">
                        Email</label>
                        <div class="input-group">
                          <span class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span>
                        </span>
                        <input type="email" class="form-control" id="email" placeholder="Enter email" required="required" /></div>
                      </div> -->
                      <div class="form-group">
                        <label for="subject">
                          Circuito</label>
                          <input type="text" class="form-control" placeholder="circuito"  ng-model="circuito" />
                        </div>
                        <ng-color-picker selected="color" style="float:right"></ng-color-picker>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="name">
                            Notas</label>
                            <textarea name="notas"  class="form-control" rows="9" cols="25" 
                            placeholder="notas" ng-model="notas"></textarea>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <button type="submit" class="btn btn-primary pull-right" id="btnContactUs">Guardar</button>
                          <button type="submit" class="btn btn-primary pull-right" id="btnContactUs">Borrar</button>
                          <!-- <input type="text" placeholder="classes" ng-model="classes"> -->
                          <input type="hidden" placeholder="color" ng-model="color">
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="col-md-9">


                </div>

                <div class="col-md-12">
                 <div class="well well-sm">
                  <gantt first-day-of-week="1"
                    load-data="loadData = fn"
                    remove-data="removeData = fn"
                    clear-data="clearData = fn"
                    sort-mode="name"
                    view-scale="scale"
                    column-width="scale === 'month' && 20 || (scale === 'week' && 10 || 5.4)"
                    column-sub-scale="scale === 'week' && 7 || 6"
                    work-hours="[8,9,10,11,12,13,14,15,16,17,18,19,20,21]"
                    show-non-work-hours="showNonWorkHours"
                    weekend-days="[0,6]"
                    show-weekends="showWeekends"
                    max-height="maxHeight"
                    on-gantt-ready="addSamples()"
                    on-row-added="rowEvent(event)"
                    on-row-clicked="rowEvent(event)"
                    on-row-updated="rowEvent(event)"
                    on-scroll="scrollEvent(event)"
                    on-task-clicked="taskEvent(event)"
                    on-task-updated="taskEvent(event)">
                </gantt>
              </div>
            </div>

          </div> 
        </div>
      </div>


      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.js"></script>
      <script src="assets/js/demo_sample_data.js"></script>
      <script src="assets/js/calendario.js"></script>
      <script src="assets/js/angular-gantt.js"></script>
      <script src="assets/js/lodash.compat.min.js"></script>
      <script src="assets/js/color-picker.js"></script>
      <script src="assets/js/ui-bootstrap-tpls-0.11.0.js"></script>


    </body>
    </html>
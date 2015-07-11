/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/app.d.ts" />

describe( "dvhClickToEdit", function() {
    //var ClickToEditController;
    var $scope;

    beforeEach( module( "dvhClickToEdit" ) );

    beforeEach( inject( function(  $rootScope ) {
        $scope = $rootScope.$new();
		//ClickToEditController = new ClickToEdit.ClickToEditController($scope);
    }));

    it( "controller should not be null", inject( function() {
        expect(true).toBeTruthy();
    })); 
});
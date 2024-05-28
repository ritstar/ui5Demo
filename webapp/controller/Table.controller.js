sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseController, MessageBox, formatter, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("ui5Demo.controller.Table", {
        formatter: formatter,
        oDialog: null,
        onInit: function () {
            // apply content density mode to root view
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

            //Getting Manifest json default Model
            this.oModel = this.getOwnerComponent().getModel();
            //Setting model to View
            this.getView().setModel(this.oModel);
            console.log("Model set on view:", this.getView().getModel());

            //Initializing Fragment Dialog to the view
            this.oDialog = this.loadFragment({
                name: "ui5Demo.fragment.dialog"
            });
        },
        //On clicking on Show Full Button the fragment Dialog will open
        showFullDetail: function (oEvent) {
            //Getting row information
            var oSource = oEvent.getSource();  //Getting source Binding Information
            //Getting row specific path Example: /Products('HT-1000')
            var oPath = oSource.getBindingContext().getPath();
            //Binding row specific path to the Fragment
            this.oDialog.then(function (pDialog) {
                pDialog.bindElement(oPath);  //Binding specific row to the Fragment
                pDialog.open();     //Calling the open method of the Fragment
            });
        },
        //Since fragment don't have their own controller they use the Called view Controller. So to close Fragment Dialog
        onCloseDialog: function () {
            this.oDialog.then(function (pDialog) {
                pDialog.close();    //Closing the fragment
            });
        },
        //To filter the Table
        filterGlobally: function (oEvent) {
            // Getting the Query param from Search Field
            var sQueryParam = oEvent.getParameter("query");
            console.log("Global Filter:", sQueryParam);
            //To create Filter just create a Array of Filter objects
            var aFilter = [];
            if (sQueryParam) {
                //FilterOperator has operators to apply in the Table Example- FilterOperator.Contains, FilterOperator.GT, LS, etc
                aFilter.push(new Filter("CompanyName", FilterOperator.Contains, sQueryParam));
            }

            //filter Binding: Just geting the Table object by ID
            var oList = this.byId("idProductsTable");
            console.log("List:", oList);
            //Getting the Table Binding. 
            var oListBinding = oList.getBinding("rows");
            console.log("List Binding:", oListBinding);
            oListBinding.filter(aFilter);
        }
    });
});
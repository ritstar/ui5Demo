sap.ui.define(["./BaseController", "sap/m/MessageBox"], function (BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("ui5Demo.controller.Main", {
		sayHello: function () {
			MessageBox.show("Hello World!");
		},
		onInit : function (){
			var oModel = new sap.ui.model.json.JSONModel({
				userForm: {
					firstName: "",
					lastname: ""
				}
			});
			this.getView().setModel(oModel);
			console.log("Model set on view:" , this.getView().getModel());
			
		},
		formSubmit: function() {
			var oModel = this.getView().getModel();
			console.log(oModel.getProperty("/userForm/firstName"));
			if (oModel) {
				var firstName = oModel.getProperty("/userForm/firstName"); // Ensure the property name matches what you're trying to access
				var lastName = oModel.getProperty("/userForm/lastName");
				var fullName = firstName.trim().charAt(0).toUpperCase() + firstName.slice(1) + " " + lastName.trim().charAt(0).toUpperCase() + lastName.slice(1);
				MessageBox.show(fullName);
				
			} else {
				MessageBox.show("Model is not available.");
			}
		},
		goToTableRoute: function() {
			this.getRouter().navTo("table");
		}
	});
});

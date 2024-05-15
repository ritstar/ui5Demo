sap.ui.define(["./BaseController", "sap/m/MessageBox"], function (BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("ui5Demo.controller.Main", {
		sayHello: function () {
			MessageBox.show("Hello World!");
		},
		onInit : function (){
			var oModel = new sap.ui.model.json.JSONModel({
				userForm: {
					firstName: "Ritesh"
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
				if (firstName) {
					MessageBox.show(firstName);
				} else {
					MessageBox.show("First name is not set.");
				}
			} else {
				MessageBox.show("Model is not available.");
			}
		}
	});
});

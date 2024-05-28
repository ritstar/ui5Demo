sap.ui.define(function () {
	"use strict";

	return {
		formatValue: function (value) {
			return value && value.toUpperCase();
		},
		weightState: function (value) {
			switch (value) {
				case "UK":
					return "Warning";
				case "Mexico":
					return "Success";
				case "Sweden":
					return "Error";
				default:
					return "None";
			}
		}
	};
});

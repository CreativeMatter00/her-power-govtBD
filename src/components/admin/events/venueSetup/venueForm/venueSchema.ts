import * as yup from "yup";

const venueSchema = yup.object().shape({
	venueName: yup.string().required("Venue name is required"),
	venueAddress: yup.string().required("Venue address is required"),
	venueDescription: yup.string().required("Venue description is required"),
	venueTitle: yup.string().required("Venue is required"),
	venueCapacity: yup
		.number()
		.typeError("Capacity must be a number")
		.required("Venue capacity is required"),
	perdayRent: yup
		.number()
		.typeError("Rent must be a number")
		.required("Venue Perday Rent is required"),
	divisionVenue: yup.string().required("Venue selection is required"),
});

export default venueSchema;

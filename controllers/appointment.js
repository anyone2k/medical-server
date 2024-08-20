// make a get request to /api/v1/appointments
const Appointment = require("../Models/Appointment");
const asyncHandler = require("../middleware/async");
const {
  
    createRessource
   
  } = require("../utils/userFunctions");
// @desc Get all appointments
// @route GET /api/v1/appointments
// @route GET /api/v1/patients/:patientId/appointments

exports.getAppointments = asyncHandler(async (req, res, next) => {
  if (req.params.patientId) {
    const appointments = await Appointment.find({
      patient: req.params.patientId,
    });
    return res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});


exports.createAppointment = asyncHandler(async (req, res, next) => {
    const result = await createRessource(Appointment, req);
    res.status(201).json(result);
  });

//exports.createAppointment = asyncHandler(async (req, res, next) => {
 // const { patientId, doctorId, dayTime, duration, reason } = req.body;

  // Création du rendez-vous
  //const appointment = await Appointment.create({
    //patient: patientId,
    //doctor: doctorId,
    //dayTime,
    //duration,
   // reason,
  //});

  // Répondre avec succès et renvoyer les détails du rendez-vous créé
  //res.status(201).json({
    //success: true,
   // data: appointment,
 // });
//});

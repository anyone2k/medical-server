
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
        default: [],
      },
    ],
  
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
});

// add appointment method
scheduleSchema.methods.addAppointment = function (appointment) {
  // if we editing an appointment, we should find it in the list of appointments already
  const updatedAppointments = [...this.schedule.appointments];

  updatedAppointments.push(appointment);

  const updatedSchedule = {
    appointments: updatedAppointments,
  };

  this.schedule = updatedSchedule;
  return this.save();
};

scheduleSchema.methods.removeAppointment = function (schId) {
  const updatedSchedule = this.schedule.appointments.filter((item) => {
    return item._id.toString() !== schId.toString();
  });
  this.schedule.appointments = updatedSchedule;
  return this.save();
};

module.exports = mongoose.model("Schedule", scheduleSchema);


Appointments = new Meteor.Collection('appointments');

if (Meteor.isClient){
  Meteor.subscribe('appointments');
}



AppointmentSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "Appointment"
    }
});
Appointments.attachSchema(AppointmentSchema);

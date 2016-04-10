
// create the object using our BaseModel
Appointment = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Appointment.prototype._collection = Appointments;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Appointments = new Mongo.Collection('Appointments');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Appointments._transform = function (document) {
  return new Appointment(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Appointments");
}

if (Meteor.isServer){
  Meteor.publish("Appointments", function (argument){
    if (this.userId) {
      return Appointments.find();
    } else {
      return [];
    }
  });
}


AppointmentSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "Appointment"
  },
  "identifier" : {
    optional: true,
    type: [ IdentifierSchema ]
  }, // External Ids for this item
  "status" : {
    optional: true,
    type: Code
  }, // R!  proposed | pending | booked | arrived | fulfilled | cancelled | noshow
  "type" : {
    optional: true,
    type: CodeableConceptSchema
  }, // The type of appointment that is being booked
  "reason" : {
    optional: true,
    type: CodeableConceptSchema
  }, // Reason this appointment is scheduled
  "priority" : {
    optional: true,
    type: Number
  }, // Used to make informed decisions if needing to re-prioritize
  "description" : {
    optional: true,
    type: String
  }, // Shown on a subject line in a meeting request, or appointment list
  "start" : {
    optional: true,
    type: Date
  }, // When appointment is to take place
  "end" : {
    optional: true,
    type: Date
  }, // When appointment is to conclude
  "minutesDuration" : {
    optional: true,
    type: Number
  }, // Can be less than start/end (e.g. estimate)
  "slot" : {
    optional: true,
    type: [ ReferenceSchema ]
  }, // (Slot) If provided, then no schedule and start/end values MUST match slot
  "comment" : {
    optional: true,
    type: String
  }, // Additional comments
  "participant.$.type" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  }, // Role of participant in the appointment
  "participant.$.actor" : {
    optional: true,
    type: ReferenceSchema
  }, // Person, Location/HealthcareService or Device
  "participant.$.required" : {
    optional: true,
    type: Code
  }, // required | optional | information-only
  "participant.$.status" : {
    optional: true,
    type: Code
  } // R!  accepted | declined | tentative | needs-action
});
Appointments.attachSchema(AppointmentSchema);

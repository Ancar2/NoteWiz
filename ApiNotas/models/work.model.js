const { default: mongoose } = require("mongoose");

const workSchema = mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      minlenght: 3,
      maxlenght: 30,
      match: /^[a-zA-ZáéíóúüÁÉÍÓÚÜ]+$/,
    },

    descripcion: {
      type: String,
      required: true,
      minlenght: 3,
      maxlenght: 100,
    },

    status: {
      type: String,
      enum: ["pendiente", "ejecutando", "finalizado"],
      default: "pendiente",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false
    },
    
    deletedAt: {
      type: Date,
      default: null
    }

  },
  {
    timestamps: true,
  }
);

const workModel = mongoose.model("work", workSchema);
module.exports = workModel;

/*
{"titulo": "ejercicio"
"descripcion" : "hacer api que el profesor dejo en clase"
"owner" : "id User"}

 */

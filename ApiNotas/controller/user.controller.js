// import nodemailer from 'nodemailer';
const nodemailer = require("nodemailer");
const { default: mongoose } = require("mongoose");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: process.env.SERVICECORREO,
  auth: { user: process.env.CORREO, pass: process.env.PASSCORREO },
});

exports.getUser = async (req, res) => {
  try {
    let data = await userModel.find({}, "-password");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getOneUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await userModel.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(205).json({ msj: "user not exist" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createUser = async (req, res) => {
  try {
    let body = req.body;

    let existe = await userModel.findOne({ correo: body.correo });
    if (existe) {
      return res
        .status(401)
        .json(`el usuario con el correo ${body.correo} ya existe`);
    }

    const verificationToken = Math.random().toString(36).substr(2, 8);
    const verificationLink = `${process.env.PUNTO_ENLACE}/verify?email=${encodeURIComponent(body.correo)}&token=${verificationToken}`;

    body.verificationToken = verificationToken;
    let newUser = new userModel(body);

    // Enviar email
    await transporter.sendMail({
      from: `"NoteWiz" <${process.env.CORREO}>`,
      to: body.correo,
      subject: "Verifica tu cuenta",
      html: `<p>Haz click para verificar tu cuenta:</p>
         <a href="${verificationLink}">Verificar cuenta</a>
         <p>${verificationToken}</p>`
    });
    if (transporter.sendMail()) {
        let guardado = await newUser.save();
      res
        .status(200)
        .json({
          user: guardado,
          message: "Usuario creado, revisa tu correo para verificar",
        });
    }
    return res.status(200).json({ message: "no se envio token" });
  } catch (error) {
    res
      .status(500)
      .json({ detalle: error.message, msj: "error al crear el usuario" });
  }
};

exports.verificar = async (req, res) => {
  try {
    let body = req.body;
    const user = await userModel.findOne({correo: body.correo});

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    

    if (user.verificationToken === body.token) {
      user.verified = true;
      user.verificationToken = "";
      await user.save();  
    }
    
    return res.status(200).json({ message: "Usuario verificado" });

  } catch (error) {
    res.status(400).json({ error: "Token inválido", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID no válido" });
    }

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    let update = await userModel
      .findByIdAndUpdate(id, { $set: data, $inc: { __v: 1 } }, { new: true })
      .lean();

    if (!update) {
      return res.status(404).json({ error: "user not found" });
    } else {
      delete update.password;
      res.status(200).json(update);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    let deleted = await userModel.findByIdAndDelete(id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json(error);
  }
};

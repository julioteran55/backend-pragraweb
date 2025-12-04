import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import usuarioRepository from "../repositories/user.repository.js";
import Usuario from "../models/user.js";

dotenv.config();

export const register = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    // Validar campos simples
    if (!nombre || !correo || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si ya existe
    const existingUser = await Usuario.findOne({ where: { correo } });

    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Hashear
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const oldUser = req.body
    // Crear usuario
    const newUser = await usuarioRepository.create({
      ...oldUser,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Usuario creado correctamente",
      user: { id: newUser.id, nombre: newUser.nombre, correo: newUser.correo },
    });

  } catch (error) {
    console.error("Error register:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};


export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // Validación simple
    if (!correo || !password) {
      return res.status(400).json({ message: "Correo y contraseña obligatorios" });
    }

    // Buscar usuario
    const user = await Usuario.findOne({ where: { correo } });

    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Comparar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Generar token
    const token = jwt.sign(
      { userId: user.id, correo: user.correo , tipoUsuario : user.tipoUsuario},
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login exitoso",
      token,
      user: { id: user.id, nombre: user.nombre, correo: user.correo },
    });

  } catch (error) {
    console.error("Error login:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const usuarioId = req.user.userId
    const { actualPassword, nuevaPassword } = req.body;

    // Validar campos
    if (!actualPassword || !nuevaPassword) {
      return res.status(400).json({ message: "Debe enviar la contraseña actual y la nueva" });
    }

    // Buscar usuario por ID
    const user = await Usuario.findByPk(usuarioId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar contraseña actual
    const isMatch = await bcrypt.compare(actualPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "La contraseña actual es incorrecta" });
    }

    // Hashear nueva contraseña
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(nuevaPassword, saltRounds);

    // Actualizar contraseña
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Contraseña actualizada correctamente" });

  } catch (error) {
    console.error("Error changePassword:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};


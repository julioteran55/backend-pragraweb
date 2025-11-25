import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        if (!token) {
            return res.status(401).json({ message: "Token no proporcionado" });
        }

        // Esperado: "Bearer xxxxxx"
        const tokenValue = token.split(" ")[1];

        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

        // Guardamos los datos del usuario para el siguiente middleware o el controlador
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};

export const isAdmin = (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        if (!token) {
            return res.status(401).json({ message: "Token no proporcionado" });
        }

        const tokenValue = token.split(" ")[1];

        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

        if (decoded.tipoUsuario !== "admin") {
            return res.status(403).json({ message: "Acceso solo para administradores" });
        }

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};



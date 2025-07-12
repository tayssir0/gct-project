import UserModel from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const registerController = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Vérifie si tous les champs sont fournis
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Vérifie si l'utilisateur existe déjà
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
                error: true,
                success: false
            });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création du payload (objet utilisateur à enregistrer)
        const payload = {
            name,
            email,
            password: hashedPassword
        };

        // Création de l'utilisateur
        const newUser = new UserModel(payload);
        await newUser.save();

        // Réponse de succès
        return res.status(200).json({
            message: "User registered successfully",
            error: false,
            success: true
        });

    } catch (error) {
        // Gestion d'erreur serveur
        return res.status(500).json({
            message: "Register error",
            error: true,
            success: false
        });
    }
};

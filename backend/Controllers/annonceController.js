const Annonce = require("../Models/annonceModel");

const createAnnonce = async (req, res) => {
  const authorId = req.user.id; // ID de l'utilisateur connecté
  try {
    const annonce = new Annonce({
      ...req.body,
      author: authorId,
    });

    if (!annonce) {
      return res.status(400).send("Merci de remplir tous les champs");
    }

    await annonce.save();
    const populatedAnnonce = await Annonce.findById(annonce._id).populate(
      "author",
      "name email", // Inclure le nom et l'email de l'auteur
    );
    res.status(201).send(populatedAnnonce);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAnnonces = async (req, res) => {
  try {
    const { title, category, description, search } = req.query;

    const filter = {};

    if (title) filter.title = { $regex: title, $options: "i" };
    if (category) filter.category = { $regex: category, $options: "i" };
    if (description)
      filter.description = { $regex: description, $options: "i" };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const annonces = await Annonce.find(filter).populate("author", "email");

    res.status(200).send(annonces);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAnnonceById = async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.annonceId).populate(
      "author",
      "name email",
    );
    if (!annonce) {
      return res.status(404).send({ error: "Annonce introuvable" });
    }
    res.status(200).send(annonce);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateAnnonce = async (req, res) => {
  const userId = req.user.id; // ID de l'utilisateur connecté
  try {
    const annonce = await Annonce.findById(req.params.annonceId);

    if (!annonce) {
      return res.status(404).send({ message: "Annonce introuvable" });
    }

    // Vérifier si l'utilisateur connecté est l'auteur de l'annonce
    if (annonce.author.toString() !== userId) {
      return res.status(403).send({ message: "Action non autorisée" });
    }

    // Mise à jour des champs
    Object.assign(annonce, req.body);
    await annonce.save();

    const updatedAnnonce = await Annonce.findById(
      req.params.annonceId,
    ).populate("author", "name email");
    res.status(200).send(updatedAnnonce);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteAnnonce = async (req, res) => {
  const userId = req.user.id; // ID de l'utilisateur connecté
  try {
    const annonce = await Annonce.findById(req.params.annonceId);

    if (!annonce) {
      return res.status(404).send({ message: "Annonce introuvable" });
    }

    // Vérifier si l'utilisateur connecté est l'auteur de l'annonce
    if (annonce.author.toString() !== userId) {
      return res.status(403).send({ message: "Action non autorisée" });
    }

    await Annonce.findByIdAndDelete(req.params.annonceId);
    res.status(200).send({ message: "Annonce supprimée avec succès" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAnnonceByUserId = async (req, res) => {
  console.log(req.user.id);
  try {
    const annonces = await Annonce.find({ author: req.user.id }).populate(
      "author",
      "id email",
    );
    if (!annonces) {
      return res.status(404).send({ error: "Aucune annonce trouvée" });
    }
    res.status(200).send(annonces);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createAnnonce,
  getAnnonces,
  getAnnonceById,
  updateAnnonce,
  getAnnonceByUserId,
  deleteAnnonce,
};

import { LivreModel } from '../models/livreModel.js';
import { AuteurModel } from '../models/auteurModel.js';

export const livreController = {
  liste: async (req, res) => {
    const { rows } = await LivreModel.getAll();
    res.render('pages/livres/liste', {
      title: 'Livres',
      livres: rows
    });
  },

  ajouterForm: async (req, res) => {
    const { rows: auteurs } = await AuteurModel.getAll();

    res.render('pages/livres/ajouter', {
      title: 'Ajouter livre',
      auteurs
    });
  },

  ajouter: async (req, res) => {
    const data = {
      ...req.body,
      disponible: req.body.disponible === 'on'
    };

    await LivreModel.create(data);
    res.redirect('/livres');
  },

  details: async (req, res) => {
    const { rows } = await LivreModel.getById(req.params.id);

    if (!rows[0]) {
      return res.status(404).render('pages/404', { title: 'Introuvable' });
    }

    res.render('pages/livres/details', {
      title: 'Détails livre',
      livre: rows[0]
    });
  },

  modifierForm: async (req, res) => {
    const { rows: livre } = await LivreModel.getById(req.params.id);
    const { rows: auteurs } = await AuteurModel.getAll();

    res.render('pages/livres/modifier', {
      title: 'Modifier livre',
      livre: livre[0],
      auteurs
    });
  },

  modifier: async (req, res) => {
    const data = {
      ...req.body,
      disponible: req.body.disponible === 'on'
    };

    await LivreModel.update(req.params.id, data);
    res.redirect(`/livres/${req.params.id}`);
  },

  supprimer: async (req, res) => {
    await LivreModel.delete(req.params.id);
    res.redirect('/livres');
  }
};import { LivreModel } from '../models/livreModel.js';
import { AuteurModel } from '../models/auteurModel.js';

export const livreController = {

  // 📌 LISTE DES LIVRES
  liste: async (req, res) => {
    try {
      const { rows } = await LivreModel.getAll();

      res.render('pages/livres/liste', {
        title: 'Livres',
        livres: rows
      });

    } catch (err) {
      console.error(err);
      res.status(500).send("Erreur serveur");
    }
  },

  // 📌 FORM AJOUT
  ajouterForm: async (req, res) => {
    try {
      const { rows: auteurs } = await AuteurModel.getAll();

      res.render('pages/livres/ajouter', {
        title: 'Ajouter livre',
        auteurs
      });

    } catch (err) {
      console.error(err);
      res.status(500).send("Erreur serveur");
    }
  },

  // 📌 AJOUT LIVRE
  ajouter: async (req, res) => {
    try {
      const data = {
        ...req.body,
        disponible: req.body.disponible === 'on'
      };

      await LivreModel.create(data);
      res.redirect('/livres');

    } catch (err) {
      // ISBN déjà existant
      if (err.code === '23505') {
        const { rows: auteurs } = await AuteurModel.getAll();

        return res.render('pages/livres/ajouter', {
          title: 'Ajouter livre',
          auteurs,
          error: "❌ ISBN déjà utilisé"
        });
      }

      console.error(err);
      res.status(500).send("Erreur serveur");
    }
  },

  // 📌 DÉTAILS LIVRE
  details: async (req, res) => {
    try {
      const { rows } = await LivreModel.getById(req.params.id);

      if (!rows[0]) {
        return res.status(404).render('pages/404', {
          title: 'Livre introuvable'
        });
      }

      res.render('pages/livres/details', {
        title: 'Détails livre',
        livre: rows[0]
      });

    } catch (err) {
      console.error(err);
      res.status(500).send("Erreur serveur");
    }
  },

  // 📌 FORM MODIFIER
  modifierForm: async (req, res) => {
    try {
      const { rows: livre } = await LivreModel.getById(req.params.id);
      const { rows: auteurs } = await AuteurModel.getAll();

      if (!livre[0]) {
        return res.status(404).render('pages/404', {
          title: 'Livre introuvable'
        });
      }

      res.render('pages/livres/modifier', {
        title: 'Modifier livre',
        livre: livre[0],
        auteurs
      });

    } catch (err) {
      console.error(err);
      res.status(500).send("Erreur serveur");
    }
  },

  // 📌 MODIFIER LIVRE
  modifier: async (req, res) => {
    try {
      const data = {
        ...req.body,
        disponible: req.body.disponible === 'on'
      };

      await LivreModel.update(req.params.id, data);
      res.redirect(`/livres/${req.params.id}`);

    } catch (err) {
      if (err.code === '23505') {
        return res.send("❌ ISBN déjà utilisé");
      }

      console.error(err);
      res.status(500).send("Erreur serveur");
    }
  },

  // 📌 SUPPRIMER LIVRE
  supprimer: async (req, res) => {
    try {
      await LivreModel.delete(req.params.id);
      res.redirect('/livres');

    } catch (err) {
      console.error(err);
      res.status(500).send("Erreur serveur");
    }
  }

};
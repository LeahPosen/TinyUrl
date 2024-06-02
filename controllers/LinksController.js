import linkModel from "../Models/linkModel.js";

const LinksController = {

  getList: async (req, res) => {
    try {
      const links = await linkModel.find();
      res.json({ links });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
      const link = await linkModel.findById(req.params.id);
      const existingClick = link.clicks.find(click => click.ipAddress === req.ip&&click.targetParamValue!=req.query[link.targetParamName]);

      if (!existingClick) {
        const clickDetail = {
          _id: link.clicks.length + 1,
          ipAddress: req.ip,
          insertedAt: new Date(),
          targetParamValue: req.query[link.targetParamName] 
        };
        link.clicks.push(clickDetail);
        await link.save();
      }
      res.redirect(link.originalUrl);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  add: async (req, res) => {
    const { originalUrl, targetParamName, targetValues } = req.body;
    try {
      const existingLink = await linkModel.findOne({ where: { url: originalUrl } });

      if (existingLink) {
        // אם הקישור כבר קיים, מחזירים את ה-URL המקוצר שלו
        const fullUrl = `${req.protocol}://${req.get('host')}/links/${existingLink.id}`;
        res.send(fullUrl);
      } else {
        // אם הקישור לא קיים, מוסיפים אותו למסד הנתונים
        const newLink = await linkModel.create({ originalUrl, targetParamName, targetValues });
        const fullUrl = `${req.protocol}://${req.get('host')}/links/${newLink.id}`;
        res.send(fullUrl);

      }

    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedLink = await linkModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });//עדכון לפי מזהה
      res.json(updatedLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await linkModel.findByIdAndDelete(id);//מחיקה לפי מזהה
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  getByTarget: async (req, res) => {
    try {
      const link = await linkModel.findById(req.params.id);
      if (!link) {
        return res.status(404).json({ message: "Link not found" });
      }
      const stats = link.clicks.reduce((acc, click) => {
        const key = click.targetParamValue || 'unknown';
        if (!acc[key]) {
          acc[key] = 0;
        }
        acc[key]++;
        return acc;
      }, {});
      res.json(stats);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
};



export default LinksController;

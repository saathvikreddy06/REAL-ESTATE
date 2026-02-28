import Property from "../models/Property.js";

export const getProperties = async (_req, res, next) => {
  try {
    const properties = await Property.find().populate("owner", "name email").sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

export const createProperty = async (req, res, next) => {
  try {
    const payload = { ...req.body, owner: req.user._id };
    const property = await Property.create(payload);
    res.status(201).json(property);
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed to edit this property" });
    }

    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed to delete this property" });
    }

    await property.deleteOne();
    res.status(200).json({ message: "Property deleted" });
  } catch (error) {
    next(error);
  }
};

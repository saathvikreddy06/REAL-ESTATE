import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

function AddProperty() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    bedrooms: 0,
    bathrooms: 0,
    areaSqFt: 0,
    imageUrl: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await api.createProperty(
        {
          ...form,
          price: Number(form.price),
          bedrooms: Number(form.bedrooms),
          bathrooms: Number(form.bathrooms),
          areaSqFt: Number(form.areaSqFt),
        },
        token
      );
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-wrap">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Add Property</h2>
        {error && <p className="error">{error}</p>}
        <label>Title<input name="title" value={form.title} onChange={handleChange} required /></label>
        <label>Description<textarea name="description" value={form.description} onChange={handleChange} required /></label>
        <label>Price<input name="price" type="number" min={0} value={form.price} onChange={handleChange} required /></label>
        <label>Location<input name="location" value={form.location} onChange={handleChange} required /></label>
        <label>Bedrooms<input name="bedrooms" type="number" min={0} value={form.bedrooms} onChange={handleChange} /></label>
        <label>Bathrooms<input name="bathrooms" type="number" min={0} value={form.bathrooms} onChange={handleChange} /></label>
        <label>Area (sqft)<input name="areaSqFt" type="number" min={0} value={form.areaSqFt} onChange={handleChange} /></label>
        <label>Image URL<input name="imageUrl" value={form.imageUrl} onChange={handleChange} /></label>
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Saving..." : "Publish Listing"}
        </button>
      </form>
    </section>
  );
}

export default AddProperty;

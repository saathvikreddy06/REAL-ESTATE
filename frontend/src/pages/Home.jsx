import { useEffect, useState } from "react";
import { api } from "../api";
import PropertyCard from "../components/PropertyCard";

function Home() {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await api.getProperties();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  return (
    <section>
      <h1>Find Your Next Home</h1>
      <p className="subtitle">Browse verified listings from trusted agents and owners.</p>

      {loading && <p>Loading properties...</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>

      {!loading && properties.length === 0 && <p>No properties available yet.</p>}
    </section>
  );
}

export default Home;

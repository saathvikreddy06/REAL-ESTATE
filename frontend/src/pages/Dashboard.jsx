import { useEffect, useState } from "react";
import { api } from "../api";
import PropertyCard from "../components/PropertyCard";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    api.getProperties().then(setProperties).catch(() => setProperties([]));
  }, []);

  const myProperties = properties.filter((p) => p.owner?._id === user?._id);

  return (
    <section>
      <h1>Welcome, {user?.name}</h1>
      <p className="subtitle">Manage your listings and post new properties.</p>
      <h2>Your Listings</h2>
      <div className="grid">
        {myProperties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
      {myProperties.length === 0 && <p>You have not posted any property yet.</p>}
    </section>
  );
}

export default Dashboard;

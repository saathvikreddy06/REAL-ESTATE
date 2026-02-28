function PropertyCard({ property }) {
  return (
    <article className="property-card">
      <img src={property.imageUrl} alt={property.title} />
      <div className="property-body">
        <h3>{property.title}</h3>
        <p>{property.description}</p>
        <div className="meta-row">
          <span>{property.location}</span>
          <strong>${property.price.toLocaleString()}</strong>
        </div>
        <div className="meta-row muted">
          <span>{property.bedrooms} bed</span>
          <span>{property.bathrooms} bath</span>
          <span>{property.areaSqFt} sqft</span>
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;

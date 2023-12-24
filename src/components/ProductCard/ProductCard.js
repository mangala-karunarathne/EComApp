import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { price, discount, discount_price, images } = product;
  const imageUrl = images.length > 0 ? images[0].url : ''; // Take the first image URL

  return (
    <Card className="product-card" style={{ width: '18rem' }}>
      {imageUrl && <Card.Img variant="top" src={imageUrl} alt={product.name} />}
      <Card.Body>
        <Card.Text>Price: ${price}</Card.Text>
        {discount > 0 && <Card.Text>Discount: {discount}%</Card.Text>}
        {discount_price !== null && (
          <Card.Text>Discounted Price: ${discount_price}</Card.Text>
        )}
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

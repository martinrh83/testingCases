const ProductImageGallery = ({ imageUrls }: { imageUrls: string[] }) => {
  if (imageUrls.length === 0) return null;
  return (
    <ul>
      {imageUrls.map((url, index) => (
        <li key={index}>
          <img src={url} alt="to test" />
        </li>
      ))}
    </ul>
  );
};

export default ProductImageGallery;

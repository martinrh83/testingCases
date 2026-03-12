import { render, screen } from "@testing-library/react";

import ProductImageGallery from "#/components/ProductImageGallery";

describe("Image gallery tests", () => {
  it("should not render anything when imageUrls is empty", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
  it("should render all images in the list", () => {
    const images = [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
    ];
    render(<ProductImageGallery imageUrls={images} />);
    const imgElements = screen.getAllByRole("img");
    expect(imgElements).toHaveLength(images.length);
    images.forEach((url, index) => {
      expect(imgElements[index]).toHaveAttribute("src", url);
    });
  });
});

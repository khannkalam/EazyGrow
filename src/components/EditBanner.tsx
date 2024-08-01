import { useState, useEffect, FC } from 'react';
import Image from 'next/image';

interface EditBannerProps {
  banner: any;
  onSave: (updatedBanner: any) => void;
  onClose: () => void;
}

const EditBanner: FC<EditBannerProps> = ({ banner, onSave, onClose }) => {
  const [formData, setFormData] = useState(banner);
  const [selectedImage, setSelectedImage] = useState<string>(banner.image);

  useEffect(() => {
    setFormData(banner);
    setSelectedImage(banner.image);
  }, [banner]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target) {
          setSelectedImage(ev.target.result as string);
          setFormData({ ...formData, image: ev.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const canvasWidth = 600;
    const canvasHeight = 400;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    if (ctx) {
      const image = new window.Image();
      image.src = selectedImage;
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(formData.title, 20, 40);
        ctx.font = '16px Arial';
        ctx.fillText(formData.description, 20, 70);
        ctx.fillText(formData.cta, 20, 100);

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${formData.title}.png`;
        link.click();
      };
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Edit Banner</h2>
          <button onClick={onClose} className="text-xl font-bold">✕</button>
        </div>
        <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden mb-4">
          <Image src={selectedImage} alt="Banner Image" layout="fill" objectFit="cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-center p-4">
            <div>
              <h3 className="text-lg font-bold">{formData.title}</h3>
              <p>{formData.description}</p>
              <button className="bg-yellow-500 text-black px-4 py-2 rounded mt-2">{formData.cta}</button>
            </div>
          </div>
        </div>
        <label className="block mb-2">Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full mb-4" />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full mb-2 p-2 border"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mb-2 p-2 border"
        />
        <input
          type="text"
          name="cta"
          value={formData.cta}
          onChange={handleChange}
          placeholder="Call to Action"
          className="w-full mb-2 p-2 border"
        />
        <div className="flex justify-between">
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded w-full mr-2">
            Save
          </button>
          <button onClick={handleDownload} className="bg-green-500 text-white px-4 py-2 rounded w-full ml-2">
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBanner;

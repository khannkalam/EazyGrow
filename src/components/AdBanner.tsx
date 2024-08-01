
import { FC } from 'react';
import Image from 'next/image';
import templateEven from '../styles/templateEven.module.css';
import templateOdd from '../styles/templateOdd.module.css';

interface AdBannerProps {
  id: number;
  title: string;
  description: string;
  cta: string;
  image: string;
  backgroundImage: string;
  onEdit: (id: number) => void;
}

const AdBanner: FC<AdBannerProps> = ({ id, title, description, cta, image, backgroundImage, onEdit }) => {

  const isEven = id % 2 === 0;
  const styles = isEven ? templateEven : templateOdd;

  return (
    <div className={`${styles.adbanner}`}>
    <div className="relative p-4 rounded-lg" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '500px' }}>
      <div className=" px-3 rounded-lg h-full flex flex-col justify-between">
        <div>
          <h2 className="text-3xl  font-bold py-2 px-5">{title}</h2>
          <p className="py-4 mx-2 ">{description}</p>
        </div>
        <div className={`${styles.cta}`}>
          <button className="bg-blue-600 px-3 py-3 rounded text-white ">{cta}</button>
          <div className={`${styles.photocontainer}`} >
          <img src={image} />
          </div>
          <button onClick={() => onEdit(id)} className="absolute top-2 right-2">
            ✏️
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdBanner;

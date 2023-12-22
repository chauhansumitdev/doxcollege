import './styles/style.css';

const Document = ({ id, title, year, price }) => {
  return (
    <div className="document">
      <p>{title}</p>
      <p>{year}</p>
      <p>{price}</p>
    </div>
  );
};

export default Document;

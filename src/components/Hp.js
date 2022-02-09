import "../App.css";

const Hp = ({ restaurant }) => {
  return (
    <div className="Hp">
      <div className="titledesc">
        <h1>{restaurant.name}</h1>
        <p>{restaurant.description}</p>
      </div>
      <img className="imgTitle" src={restaurant.picture} alt="" />
    </div>
  );
};
export default Hp;

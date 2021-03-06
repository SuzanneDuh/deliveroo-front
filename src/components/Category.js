import "../App.css";

const Category = ({ category, addCart }) => {
  return (
    <div className="c">
      <h2 className="d">{category.name}</h2>
      <div className="e">
        {category.meals.map((meal, index) => {
          return (
            <div
              key={meal.id}
              onClick={() => {
                addCart(meal);
              }}
            >
              <h3>{meal.title}</h3>
              <p>{meal.description}</p>
              {meal.picture && (
                <img className="mealpicture" src={meal.picture} alt="" />
              )}
              <span>{meal.price}</span>
              {meal.popular && <span>⭐️ Populaire</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;

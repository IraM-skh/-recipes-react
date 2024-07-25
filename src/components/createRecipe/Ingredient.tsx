const Ingredient: React.FC = () => {
  return (
    <div className="ingredient">
      <input type="text" placeholder="ингредиент"></input>
      <input type="text" placeholder="колисетво"></input>
      <select>
        <option>гр.</option>
        <option>ч.л.</option>
        <option>кг.</option>
      </select>
    </div>
  );
};

export default Ingredient;

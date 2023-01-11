const Item = ({ item, imgObj, drag }) => {
  return (
    <div className="unranked-cell">
      <img
        id={`item-${item.id}`}
        src={imgObj.image}
        style={{ cursor: "pointer" }}
        draggable="true"
        onDragStart={drag}
      />
    </div>
  );
};
export default Item;

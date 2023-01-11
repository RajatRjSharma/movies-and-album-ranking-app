import React, { useEffect, useState } from "react";
import RankingGrid from "./RankingGrid";
import ItemCollection from "./ItemCollection";

const RankItems = ({ items, setItems, dataType, imgArr, localStorageKey }) => {
  const [reload, setReload] = useState(false);

  function Reload() {
    setReload(true);
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drop(ev) {
    ev.preventDefault();
    const targetElm = ev.target;
    if (targetElm.nodeName === "IMG") return false;
    if (targetElm.childNodes.length === 0) {
      const imageId = parseInt(ev.dataTransfer.getData("text").substring(5));
      const updatedItems = items.map((item) =>
        item.id === parseInt(imageId)
          ? { ...item, ranking: parseInt(targetElm.id.substring(5)) }
          : { ...item }
      );
      setItems(updatedItems);
    }
  }

  useEffect(() => {
    if (items == null) {
      getDataFromApi();
    }
  }, [dataType]);

  function getDataFromApi() {
    fetch(`item/${dataType}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setItems(data);
      });
  }

  useEffect(() => {
    if (items != null)
      localStorage.setItem(localStorageKey, JSON.stringify(items));
    setReload(false);
  }, [items]);

  useEffect(() => {
    if (reload === true) getDataFromApi();
  }, [reload]);

  return items != null ? (
    <main>
      <RankingGrid
        items={items}
        imgArr={imgArr}
        drag={drag}
        allowDrop={allowDrop}
        drop={drop}
      />
      <ItemCollection items={items} imgArr={imgArr} drag={drag} />
      <button
        onClick={Reload}
        style={{ marginTop: "10px", marginBottom: "10px" }}
        className="Reload"
      >
        Reload
      </button>
    </main>
  ) : (
    <main>Loading....</main>
  );
};

export default RankItems;

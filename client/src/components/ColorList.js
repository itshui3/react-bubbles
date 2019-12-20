import React, { useState } from "react";
import { axiosWithAuth } from '../helpers/axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {

  console.log(colors, 'colors', colors.length, 'length');
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    const item = colors.find(e => {
      return (e.id === colorToEdit.id)
    })

    const index = colors.indexOf(item)

    const newColors 
      = colors.slice(0, index)
        .concat(colorToEdit)
        .concat(colors.slice(index + 1))

    if(colorToEdit.code.hex && colorToEdit.color) {
      axiosWithAuth().put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then( res => {
        console.log(res)
        // refresh to check that the right one was deleted
        updateColors(newColors)
      })
      .catch( err => {
        console.log(err)
      })
    }

  };

  const deleteColor = color => {
    // make a delete request to delete this color
    const index = colors.indexOf(color)
    console.log(index, 'index to delete')

    const newColors 
      = colors.slice(0, index)
        .concat(colors.slice(index + 1))
    
    axiosWithAuth().delete(`/colors/${color.id}`)
      .then( res => {
        console.log(res)
        // refresh to check that the right one was deleted
        updateColors(newColors)
      })
      .catch( err => {
        console.log(err)
      })
  };

  const addColor = ev => {
    ev.preventDefault()
    if(colorToAdd.code.hex && colorToAdd.color) {
      axiosWithAuth().post(`/colors/`, colorToAdd)
      .then( res => {
        console.log(res)
      })
      .catch( err => {
        console.log(err)
      })
    }
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color, index) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            
          </div>
        </form>
    </div>
  );
};

export default ColorList;

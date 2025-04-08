import { useState } from "react";
import CheckBoxRendering from "./CheckBoxRendering/CheckBoxRendering";
import { checkboxesData } from "./NestedCheckBox.config";

function NestedCheckBox() {
  const [checked,setChecked]=useState({})
  return <CheckBoxRendering data={checkboxesData} checked={checked} setChecked={setChecked} />;
}

export default NestedCheckBox;

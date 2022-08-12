import React from "react";

function UnitOption({value, label}) {

  return(
    <option key={value} value={value}>{label}</option>
  );
}

export default UnitOption;
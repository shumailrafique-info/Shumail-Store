import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, selectCount } from "./ProductListSlice";

export default function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return <div>Counter</div>;
}

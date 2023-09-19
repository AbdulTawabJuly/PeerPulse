import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, incrementAsync, selectCount } from "./counterSlice";

export default function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <div><h1 className="p-10 text-4xl bg-zinc-900 text-gray-50">Hello World</h1></div>
    </div>
  );
}

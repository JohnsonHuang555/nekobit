import React, { useEffect, useState } from 'react';

const Test = () => {
  useEffect(() => {
    setupBeforeUnloadListener();
  }, [])

  const doSomethingBeforeUnload = () => {
    // Do something
    alert("ddddd")
  }

  const setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return doSomethingBeforeUnload();
    });
  }
  return (
    <div>Test</div>
  )
}

export default Test;

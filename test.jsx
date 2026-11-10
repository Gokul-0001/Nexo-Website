"use client";

function Test() {
  return (
    <div>
      <div
        className="a"
        style={{ background: "x", opacity: 0.9 }}
      />
      <div
        className="b"
        style={{
          background: "x",
          opacity: 0.75,
          animationDelay: "-8s",
        }}
      />
      <div
        className="c"
        style={{
          background: "x",
          opacity: 0.7,
          animationDelay: "-14s",
        }}
      />
    </div>
  );
}
export default Test;
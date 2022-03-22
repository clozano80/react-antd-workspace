//const addText = (lines) => Array.from({length: lines}, (_, i) => (`linea ${i}`));
const addText = (lines) =>
  [...Array(lines).keys()].map((i) => (
    <div key={i}>
      linea {i}
      <br />
    </div>
  ));
export default function AppExample() {
  return (
    <>
      <h1>AppExample</h1>
      {addText(50)}
    </>
  );
}

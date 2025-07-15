import { useRegion } from "../components/contaextApi/RegionContext.jsx";

const Region = () => {
  const { region, setRegion } = useRegion();

  return (
    <div style={{ display: "flex", alignItems: "center", marginLeft: "20px" ,marginTop:"1px"}}>
      <label htmlFor="regionSelect" style={{ marginRight: "5px",fontSize: '1.4rem' }}>المنطقة:</label>
      <select
        id="regionSelect"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        style={{
          padding: "4px 8px",
          borderRadius: "5px",
          border: "2px solid #0d9488",
          fontSize: "1.4rem",
          margin:" 0 4px ",
          marginBottom:'8px'
        }}
      >
        <option value="غزة">غزة</option>
        <option value="مصر">مصر</option>
        <option value="سوريا">سوريا</option>
      </select>
    </div>
  );
};

export default Region;

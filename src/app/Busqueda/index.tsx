import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Busqueda() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(search);
  }, [search]);

  const handleSearch = () => {
    if (search === "") {
      navigate(`/productos`);
      return;
    }
    navigate(`/productos/${search}`);
  };

  return (
    <div className="flex justify-content-center align-items-center h-full flex-column">
      <Card>
        <Button
          label="Ver Compras"
          onClick={() => {
            navigate("/compras");
          }}
        ></Button>
      </Card>
      <Card className="m-2">
        <div className="grid gap-2">
          <div className="col-12 flex justify-content-center">
            <Image
              src="https://primefaces.org/cdn/primereact/images/galleria/galleria7.jpg"
              alt="Image"
              width="250"
            />
          </div>
          <div className="col-12 text-center">
            <h1>BAZAR ONLINE</h1>
          </div>
          <div className="col-12 flex justify-content-center">
            <FloatLabel>
              <InputText
                id="busqueda"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <label htmlFor="busqueda">Busqueda</label>
            </FloatLabel>
          </div>
          <div className="col-12 text-center">
            <Button label="BUSCAR" onClick={handleSearch} />
          </div>
        </div>
      </Card>
    </div>
  );
}

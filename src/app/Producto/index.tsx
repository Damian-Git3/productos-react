import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";

import useProductos from "../../hooks/useProductos";
import { FloatLabel } from "primereact/floatlabel";

export function Producto() {
  const { id } = useParams();
  const { product, loading, error, getProducto, postCompra } = useProductos();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    getProducto(Number(id));
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Ha ocurrido un error</div>;
  }

  const handleComprar = () => {
    setVisible(true);
  };

  const handleRegresar = () => {
    navigate("/productos");
  };

  const footer = () => {
    return (
      <>
        <div className="grid gap-1 justify-content-center">
          <Button onClick={handleComprar}>Comprar</Button>
          <Button onClick={handleRegresar}>Regresar</Button>
        </div>
        <Dialog
          header="Confirmar Compra"
          visible={visible}
          style={{ width: "80vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <div className="grid gap-1">
            <div className="col-12 text-center">
              <h1>¿Estás seguro de querer comprar este producto?</h1>
            </div>
            <div className="col-12 grid justify-content-center">
              <FloatLabel>
                <InputNumber
                  value={cantidad}
                  onValueChange={(e) => setCantidad(e.value)}
                />
                <label>Cantidad</label>
              </FloatLabel>
            </div>
            <div className="col-12 grid gap-2 justify-content-center">
              <Button
                onClick={() => {
                  postCompra(Number(id), cantidad);
                  setVisible(false);
                }}
              >
                Comprar
              </Button>
              <Button onClick={() => setVisible(false)}>Cancelar</Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  };

  return (
    <div className="grid m-0 p-0">
      <div className="col-12 text-center">
        <h1>Producto</h1>
      </div>
      <Card className="m-2" footer={footer}>
        <div className="grid">
          <div className="col-12 flex justify-content-around">
            {product?.image.map((img, index) => (
              <Image
                key={index}
                className="image-container"
                src={img}
                alt="Image"
                width="50"
                height="50"
              />
            ))}
          </div>
          <div className="col-12 text-center">
            <h1>{product.title}</h1>
            <span>{product.category}</span>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

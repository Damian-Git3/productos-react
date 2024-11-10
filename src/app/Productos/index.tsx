import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { useEffect } from "react";
import useProductos from "../../hooks/useProductos";
import { IProduct } from "../../interfaces/productos.interfaces";
import { useNavigate, useParams } from "react-router-dom";

import "./styles.css";
import { Rating } from "primereact/rating";

export function Productos() {
  const { productos, loading, error, getProductos } = useProductos();
  const { search } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductos(search);
  }, [search]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Ha ocurrido un error</div>;
  }

  const handleSearch = (id: number) => {
    navigate(`/producto/${id}`);
  };

  return (
    <div className="grid m-0 p-0">
      <div className="col-12 text-center">
        <h1>Lista de Productos</h1>
      </div>

      {(productos as IProduct[]).map((producto: IProduct) => (
        <Card className="m-2" onClick={() => handleSearch(producto.id)}>
          <div className="grid">
            <div className="col-4  p-1  ">
              <Image
                className="image-container"
                src={producto.image[0]}
                alt="Image"
                width="100"
              />
            </div>
            <div className="col-8  p-1">
              <span className="font-bold">{producto.title}</span>
              <br />
              <span>{producto.category}</span>
              <p>{producto.description}</p>
              <p>Precio: ${producto.price}</p>
              <Rating value={producto.rating} readOnly cancel={false} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

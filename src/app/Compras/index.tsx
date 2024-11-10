import { useEffect } from "react";
import { Card } from "primereact/card";
import useProductos from "../../hooks/useProductos";

export function Compras() {
  const { compras, loading, error, getCompras } = useProductos();

  useEffect(() => {
    getCompras();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Ha ocurrido un error</div>;
  }

  return (
    <>
      <div className="grid m-0 p-0">
        <div className="col-12 text-center">
          <h1>Compras</h1>
        </div>

        {compras.map((compra) => (
          <Card key={compra.id} className="m-2">
            <div className="grid">
              <div className="col-12">
                <h1>{compra.title}</h1>
              </div>
              <div className="col-12">
                <span>Cantidad: {compra.quantity}</span>
              </div>
              <div className="col-12">
                <span>Fecha de Compra</span>
                <p>{formatDate(compra.purchase_date)}</p>
              </div>
              <div className="col-12">
                <span>Total</span>
                <p>$ {compra.total}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

import axios from "axios";
import { useReducer } from "react";
import { IProduct, Purchase } from "../interfaces/productos.interfaces";
import { useNavigate } from "react-router-dom";
const api: string = "https://examen-mena-backend.onrender.com/api";

// Estado inicial
const initialState = {
  productos: [] as IProduct[],
  product: {} as IProduct,
  compras: [] as Purchase[],
  loading: true,
  error: false,
};

interface IResponse {
  message: string;
  data: any[];
}

// Reducer para manejar las acciones
interface Action {
  type: string;
  payload?: any;
}

const productosReducer = (state: typeof initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        productos: payload,
        loading: false,
        error: false,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        productos: [],
        loading: false,
        error: true,
      };

    case "FETCH_PRODUCT":
      return {
        ...state,
        product: payload,
        loading: false,
        error: false,
      };

    case "FETCH_PRODUCT_ERROR":
      return {
        ...state,
        product: {},
        loading: false,
        error: true,
      };

    case "POST_COMPRA":
      return {
        ...state,
        loading: false,
        error: false,
      };
    case "POST_COMPRA_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "GET_COMPRAS":
      return {
        ...state,
        compras: payload,
        loading: false,
        error: false,
      };
    case "GET_COMPRAS_ERROR":
      return {
        ...state,
        compras: [],
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

// Hook principal para gestionar productos
export default function useProductos() {
  const [state, dispatch] = useReducer(productosReducer, initialState);
  const navigate = useNavigate();

  // Función para obtener todos los productos
  const getProductos = async (search: string) => {
    try {
      const response: IResponse = await (
        await axios.get(`${api}/productos`, {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            search: search,
          },
        })
      ).data;

      if (Array.isArray(response.data)) {
        console.log("es un array");
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } else {
        console.log("no es un array");
        dispatch({ type: "FETCH_ERROR" });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "FETCH_ERROR" });
    }
  };

  const getProducto = async (id: number) => {
    try {
      const response: IResponse = await (
        await axios.get(`${api}/producto/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).data;

      console.log(response.data);

      if (response.data) {
        dispatch({ type: "FETCH_PRODUCT", payload: response.data });
      } else {
        dispatch({ type: "FETCH_PRODUCT_ERROR" });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "FETCH_PRODUCT_ERROR" });
    }
  };

  const postCompra = async (id: number, cantidad: number) => {
    try {
      const response: IResponse = await (
        await axios.post(`${api}/comprar`, {
          id: id,
          cantidad: cantidad,
        })
      ).data;

      if (response.message) {
        dispatch({ type: "POST_COMPRA" });
        navigate("/compras");
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "POST_COMPRA_ERROR" });
    }
  };

  const getCompras = async () => {
    try {
      const response: IResponse = await (
        await axios.get(`${api}/compras`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).data;

      if (Array.isArray(response.data)) {
        dispatch({ type: "GET_COMPRAS", payload: response.data });
      } else {
        dispatch({ type: "GET_COMPRAS_ERROR" });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "GET_COMPRAS_ERROR" });
    }
  };

  return {
    productos: state.productos,
    product: state.product,
    compras: state.compras,
    loading: state.loading,
    error: state.error,
    getProductos,
    getProducto,
    postCompra,
    getCompras,
  };
}

import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getProducts,deleteProducts } from "../../redux/apiCalls";

export default function ProductList() {
  const dispatch = useDispatch()
  const products = useSelector((state)=>state.product.products.products)
  console.log(products)

  useEffect(()=>{
    getProducts(dispatch)
    // console.log("disptach success")
  },[dispatch])

  const handleDelete = (id) => {
    // console.log("handleDelete "+id)
    deleteProducts(id,dispatch)
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 220 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
       {products.length > 0 ? (
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={8}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

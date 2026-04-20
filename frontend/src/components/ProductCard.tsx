import type {  Product }  from "../types/product.type";

interface productCardProps {

    product : Product;
    categoryName : string
}

const ProductCard = ({product,categoryName}: productCardProps) =>{

return (


  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group">


    {/* Imagen */}
    <div className="aspect-square bg-slate-100 overflow-hidden">
      {product.image_url ? (
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-300 text-sm">
          Sin imagen
        </div>
      )}
    </div>




    {/* Contenido */}
    <div className="p-4">
      <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
        { categoryName } 
      </p>


      <h3 className="font-semibold text-slate-800 mb-1 truncate">
        {product.name}
      </h3>


      <p className="text-slate-500 text-sm mb-3 line-clamp-2">
        {product.description || 'Sin descripción'} {/* el || significa "o" en JavaScript, muestra la descripcion del producto pero si es null o vacio muestra sin descripcion */}
      </p>


      <div className="flex items-center justify-between">

        <span className="text-lg font-bold text-slate-800">
         <span>${Number(product.price).toLocaleString()}</span> {/*toLocaleString() formatea el número según el idioma del navegador — agrega los separadores de miles automáticamente.*/ }
        </span>


        <button className="bg-slate-800 text-white text-sm px-3 py-2 rounded-lg hover:bg-slate-700 transition">
          Agregar
        </button>

      </div>
    </div>

  </div>
);

};

export default ProductCard;
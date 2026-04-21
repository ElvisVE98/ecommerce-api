import Navbar from '../components/Navbar';
import Footer from '../components/FooterPage';
import type {Product,Category} from '../types/product.type';
import { getProducts,getCategories } from '../services/product.service';
import { useState,useEffect } from 'react';
import ProductCard from '../components/ProductCard';





const CatalogPage = () =>{

    const [products,setProducts] = useState<Product[]>([]);
    const [categories,setCategories] = useState<Category[]>([]);
    const [loading,setLoading] = useState(true);
    const [selectedCategory,setSelectedCategory] = useState<string>('all');
    const [searchQuery,setSearchQuery] = useState('');

   
    
    const filteredProducts = products
  .filter(p => selectedCategory === 'all' || p.category_id === selectedCategory)
  .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    useEffect (() =>{

        const fetchData = async() =>{
            try {
                const [productsData,categoriesData] = await Promise.all([
                    getProducts(),
                    getCategories(),
                ]);         
            setProducts(productsData);
            setCategories(categoriesData);
        }catch(error) {
            console.error('Error cargando datos ', error);
        }finally{
            setLoading(false);
        }
    };
    fetchData();
},[]);

if(loading){
    return(
        <div className='min-h-screen flex items-center justify-center'>
            <p className='text-slate-500 text-lg'>Cargando productos...</p>
        </div>
    );
}
    

    return(
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <main className='flex-1 max-w-6xl mx-auto px-8 py-10 w-full'>
                <h1 className='text-3xl font-bold text-slate-800 mb-2'>Nuestra Colección</h1>
                <p className='text-slate-500 mb-8'>Explora todos nuestros Productos</p>

            {/* Filtro por categoría - dos columnas */}

            <div className='flex gap-8'>

            {/* Columna izquierda — filtros */}
                <div className='w-48 shrink-0'>
                    <p className='text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3'>Categorias</p>

                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition ${selectedCategory === 'all'? 'bg-slate-800 text-white': 'text-slate-600 hover:bg-slate-100'}`}>
                        Todo
                    </button>



                    {/* Botones de cada categoría */}
                     {categories.map((category) => (
                    <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition
                    ${selectedCategory === category.id
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                    }`}>
                {category.name}
                </button>
                ))}
                </div>


            

               {/* Columna derecha — productos */}
                <div className='flex-1'>
                    <input type="text"
                    placeholder='Buscar Productos'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='w-full border border-slate-200 rounded-lg px-4 py-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    />
                <div className='grid grid-cols-3 gap-6'>
                    {filteredProducts.map((product) =>{
                        const category = categories.find(c => c.id === product.category_id);
                        return(
                        <ProductCard 
                        key = {product.id} 
                        product={product}
                        categoryName={category?.name || 'sin categoria'}
                         />
                        );
                     })}
                </div>
            </div>
        </div>
        </main>
    <Footer />
        </div>        

    );
};

export default CatalogPage;

//UseEffect es un hook para cargar los datos , sirve 
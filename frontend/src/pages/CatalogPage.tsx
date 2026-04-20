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



                {/*Cards para ver los productos */}

                <div className='grid grid-cols-3 gap-6'>
                    {products.map((product) =>{
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


            </main>
            <Footer />
        </div>        

    );
};

export default CatalogPage;

//UseEffect es un hook para cargar los datos , sirve 
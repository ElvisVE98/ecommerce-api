import Navbar from "../components/Navbar";
import Footer from "../components/FooterPage";

const CartPage = () =>{
    return(
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <main className='flex-1'>
                <h1>Catálogo</h1>
            </main>
            <Footer />

        </div>

    );
};

export default CartPage;
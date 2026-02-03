import { useParams, Link } from 'react-router-dom';
import { useProductDetail } from '../../hooks/useProductDetail';
import { useCart } from '../../hooks/useCart';
import { useCartContext } from '../../context/CartContext';
import Actions from '../../components/Actions/Actions';
import Description from '../../components/Description/Description';
import Image from '../../components/Image/Image';


const ProductDetailPage = () => {
    const { id } = useParams();
    const { product, loading, error } = useProductDetail(id);
    const { addProductToCart, isAdding } = useCart();
    const { updateCartCount } = useCartContext();

    const handleAddToCart = async (colorCode, storageCode) => {
        const responseCount = await addProductToCart(id, colorCode, storageCode);

        if (responseCount) {
            updateCartCount(responseCount);
        }
    };

    if (loading) return <div className="text-center py-20">Loading product details...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">← Back to store</Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                <div className="sticky top-24">
                    <Image src={product.imgUrl} alt={product.model} />
                </div>

                <div className="space-y-8">
                    <Description product={product} />

                    <Actions
                        options={product.options}
                        onAddToCart={handleAddToCart}
                        isAdding={isAdding}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
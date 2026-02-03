import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailQuery, useAddToCartMutation } from '../../features/api/productsApi';
import { updateCartCount } from '../../features/cart/cartSlice';
import Actions from '../../components/Actions/Actions';
import Description from '../../components/Description/Description';
import Image from '../../components/Image/Image';


const ProductDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data: product, isLoading: loading, error } = useGetProductDetailQuery(id);
    const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

    const handleAddToCart = async (colorCode, storageCode) => {
        try {
            const payload = {
                id,
                colorCode: parseInt(colorCode),
                storageCode: parseInt(storageCode)
            };
            const response = await addToCart(payload).unwrap();

            if (response?.count) {
                dispatch(updateCartCount(response.count));
            }
        } catch (err) {
            console.error('Failed to add to cart:', err);
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
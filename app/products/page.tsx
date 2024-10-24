import AddProduct from "./addProduct";
import prisma from "@/utils/db";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";



const getProducts = async () => {
    const res = await prisma.product.findMany({
        select: {
            id: true,
            title: true,
            price: true,
            brandId: true,
            brand: true
        }
    });
    return res;
}

const getBrands = async () => {
    const res = await prisma.brand.findMany();
    return res;
};

const Product = async () => {
    const [products, brands] = await Promise.all([
        getProducts(),
        getBrands()
    ]);

    // if (!brands || !products) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
            <div className="mb-2">
                <AddProduct brands={brands} />
            </div>

            <table className="table w-full">
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>PRODUCT NAME</th>
                        <th>PRICE</th>
                        <th>BRAND</th>
                        <th className="text-center">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.brand.name}</td>
                            <td className="flex justify-center space-x-3">
                                <UpdateProduct brands={brands} product={product} />
                                <DeleteProduct product={product} />

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default Product

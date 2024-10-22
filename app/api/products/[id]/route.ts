import { NextResponse } from "next/server";
import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const product = await prisma.product.delete({
            where: {
                id: Number(params.id),
            },
        });
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("Failed to delete product:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
};

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const body: Product = await request.json();
        const product = await prisma.product.update({
            where: {
                id: Number(params.id),
            },
            data: {
                title: body.title,
                price: body.price,
                brandId: body.brandId,
            }
        });
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("Failed to delete product:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
};

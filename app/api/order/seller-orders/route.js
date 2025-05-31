import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import connectDB from "../../../../config/bd";
import Order from "../../../../models/Order";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    await connectDB();

    Address.length;

    const orders = await Order.find({}).populate("address items.product");

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

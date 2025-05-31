import Product from "../../../../models/Product";
import connectDB from "../../../../config/bd";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

//configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    // get user ID from clerk authentication
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({
        successs: false,
        messasge: "Not Authorized to post products",
      });
    }

    //parse fomr data from the request
    const formData = await request.formData();

    //extract product details from the form data
    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = formData.get("price");
    const offerPrice = formData.get("offerPrice");

    // to get all uploaded image files
    const files = formData.getAll("image");

    // Validate that at least one image was uploaded
    if (!files || files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No files uploaded",
        },
        { status: 400 }
      );
    }

    // process all images to cloudinary
    const result = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        // Create a promise for each image upload
        return new Promise((resolve, reject) => {
          // Create upload stream to Cloudinary
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" }, // Auto-detect resource type
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          // Pipe the buffer data to the upload stream
          stream.end(buffer);
        });
      })
    );

    // Connect to MongoDB
    await connectDB();

    // Get and extract image url from cloudinary response
    const image = result.map((result) => result.secure_url);

    // create a product in the database

    const newProduct = await Product.create({
      userId,
      name,
      description,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice),
      image, // array of image urls
      date: Date.now(), // will get the timestamp date and time
    });

    // Return success response with new product data
    return NextResponse.json(
      {
        success: true,
        message: "Upload was successful",
        newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle any errors that occur during the process
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

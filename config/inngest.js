// Create an Inngest client
// Inngest invokes your functions securely via an API endpoint at / api / inngest.To enable that, you will create an Inngest client in your Next.js project, which you will use to send events and create functions.

// Make a new directory next to your app directory(for example, src / inngest) where you'll define your Inngest functions and the client.

// In the / src / inngest directory create an Inngest client:

import { Inngest } from "inngest";
import User from "../models/User"; // Import User model
import dbConnect from "./bd";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app" });

export const syncUserCreation = inngest.createFunction({
  id: "sync-user-from-clerk"
},
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };
    await dbConnect();
    await User.create(userData)
  }
)

export const syncUserUpdate = inngest.createFunction({
  id: "sync-user-update-from-clerk"
},
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };
    await dbConnect();
    await User.findByIdAndUpdate(id, userData)
  }
)

export const syncUserDelete = inngest.createFunction({
  id: "delete-user-from-clerk"
},
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await dbConnect();
    await User.findByIdAndDelete(id)
  }
)


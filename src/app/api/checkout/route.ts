import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import twilio from "twilio";

export const dynamic = 'force-dynamic';

function generateTrackingCode() {
  return "GSR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(req: Request) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ 
        error: "Supabase configuration missing on Vercel. Please add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your Vercel Environment Variables." 
      }, { status: 500 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { customer, cart, total, paymentReference } = await req.json();

    // 1. Verify Payment with Paystack
    const secretKey = "sk_test_f73288b4520b1235808e4f9af4e9979e3d635105".trim();
    
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${paymentReference}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });
    
    const paystackData = await paystackRes.json().catch(() => ({ status: false, message: "Invalid Paystack Response" }));

    if (!paystackData.status || paystackData.data?.status !== 'success') {
      return NextResponse.json({ 
        error: `Payment verification failed: ${paystackData.message || "Invalid transaction"}` 
      }, { status: 400 });
    }

    const paidAmount = paystackData.data.amount / 100;
    if (paidAmount < total) {
      return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
    }

    const trackingCode = generateTrackingCode();

    // 2. Create Order
    const { data: order, error } = await supabase
      .from("orders")
      .insert([
        {
          tracking_code: trackingCode,
          customer_name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          total,
          status: "paid",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // 3. Insert Items
    const items = cart.map((item: any) => ({
      order_id: order.id,
      product_id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    await supabase.from("order_items").insert(items);

    // 4. Initial Tracking Update
    await supabase.from("tracking_updates").insert([
      {
        order_id: order.id,
        status: "Confirmed",
        message: "Your payment has been verified and order is confirmed.",
      },
    ]);

    // 5. Notify Admin via WhatsApp
    try {
      if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
        const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        await twilioClient.messages.create({
          from: process.env.TWILIO_WHATSAPP_NUMBER!,
          to: process.env.ADMIN_WHATSAPP_NUMBER!,
          body: `✅ NEW ORDER RECIEVED 🚀
Name: ${customer.name}
Phone: ${customer.phone}
Amount: ₦${total.toLocaleString()}
Tracking ID: ${trackingCode}`,
        });
      }
    } catch (twilioErr) {
      console.error("Twilio Error:", twilioErr);
    }

    return NextResponse.json({ success: true, trackingCode });
  } catch (err: any) {
    console.error("Checkout Error:", err);
    return NextResponse.json({ error: err.message || "Checkout failed" }, { status: 500 });
  }
}

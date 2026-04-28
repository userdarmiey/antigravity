import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const { trackingCode } = await req.json();

    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("tracking_code", trackingCode)
      .single();

    if (!order || error) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const { data: updates } = await supabase
      .from("tracking_updates")
      .select("*")
      .eq("order_id", order.id)
      .order("created_at", { ascending: true });

    return NextResponse.json({ order, tracking: updates });
  } catch (err) {
    return NextResponse.json({ error: "Tracking failed" }, { status: 500 });
  }
}
